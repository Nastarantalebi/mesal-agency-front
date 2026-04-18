import { useCallback, useEffect, useRef, useState } from "react";

type IntervalId = ReturnType<typeof setInterval>;

interface UseOTPExpireReturn {
  canResend: boolean;
  isExpired: boolean;

  // Start countdowns using UTC timestamps (recommended)
  startExpireCountdownAt: (
    expireAtUtc: string | Date,
    serverNowUtc?: string | Date,
  ) => void;
  startResendCountdownAt: (
    resendAtUtc: string | Date,
    serverNowUtc?: string | Date,
  ) => void;

  // If you only have seconds (optional helper)
  startResendCountdownSeconds: (seconds: number) => void;

  resetCountdowns: () => void;

  formattedResendTime: string;
  formattedExpireTime: string;
}

function toMs(input: string | Date): number {
  const ms = input instanceof Date ? input.getTime() : Date.parse(input);
  return ms;
}

function clampToSeconds(ms: number): number {
  if (!Number.isFinite(ms)) return 0;
  return Math.max(0, Math.ceil(ms / 1000));
}

export default function useOTPExpire(): UseOTPExpireReturn {
  const [resendCountdown, setResendCountdown] = useState(0);
  const [otpExpireCountdown, setOtpExpireCountdown] = useState(0);

  const resendIntervalRef = useRef<IntervalId | null>(null);
  const expireIntervalRef = useRef<IntervalId | null>(null);

  // If client clock differs from server clock, compensate once
  const clockSkewMsRef = useRef(0);

  const resendDeadlineMsRef = useRef<number | null>(null);
  const expireDeadlineMsRef = useRef<number | null>(null);

  const formatTime = useCallback((seconds: number): string => {
    const safe = Math.max(0, seconds);
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const clearResendInterval = useCallback(() => {
    if (resendIntervalRef.current) {
      clearInterval(resendIntervalRef.current);
      resendIntervalRef.current = null;
    }
  }, []);

  const clearExpireInterval = useCallback(() => {
    if (expireIntervalRef.current) {
      clearInterval(expireIntervalRef.current);
      expireIntervalRef.current = null;
    }
  }, []);

  const setClockSkewFromServerNow = useCallback(
    (serverNowUtc?: string | Date) => {
      if (!serverNowUtc) return;
      const serverNowMs = toMs(serverNowUtc);
      if (!Number.isFinite(serverNowMs)) return;
      clockSkewMsRef.current = serverNowMs - Date.now();
    },
    [],
  );

  const nowCorrectedMs = useCallback(
    () => Date.now() + clockSkewMsRef.current,
    [],
  );

  const startExpireCountdownAt = useCallback(
    (expireAtUtc: string | Date, serverNowUtc?: string | Date) => {
      setClockSkewFromServerNow(serverNowUtc);

      const deadlineMs = toMs(expireAtUtc);
      if (!Number.isFinite(deadlineMs)) {

        setOtpExpireCountdown(0);
        return;
      }

      expireDeadlineMsRef.current = deadlineMs;
      clearExpireInterval();

      const tick = () => {
        const dl = expireDeadlineMsRef.current;
        if (!dl) return;

        const remainingSec = clampToSeconds(dl - nowCorrectedMs());
        setOtpExpireCountdown(remainingSec);

        if (remainingSec <= 0) clearExpireInterval();
      };

      tick(); // set immediately
      expireIntervalRef.current = setInterval(tick, 1000);
    },
    [clearExpireInterval, nowCorrectedMs, setClockSkewFromServerNow],
  );

  const startResendCountdownAt = useCallback(
    (resendAtUtc: string | Date, serverNowUtc?: string | Date) => {
      setClockSkewFromServerNow(serverNowUtc);

      const deadlineMs = toMs(resendAtUtc);
      if (!Number.isFinite(deadlineMs)) {

        setResendCountdown(0);
        return;
      }

      resendDeadlineMsRef.current = deadlineMs;
      clearResendInterval();

      const tick = () => {
        const dl = resendDeadlineMsRef.current;
        if (!dl) return;

        const remainingSec = clampToSeconds(dl - nowCorrectedMs());
        setResendCountdown(remainingSec);

        if (remainingSec <= 0) clearResendInterval();
      };

      tick();
      resendIntervalRef.current = setInterval(tick, 1000);
    },
    [clearResendInterval, nowCorrectedMs, setClockSkewFromServerNow],
  );

  const startResendCountdownSeconds = useCallback(
    (seconds: number) => {
      if (!Number.isInteger(seconds) || seconds < 0) {
        return;
      }
      const deadlineMs = nowCorrectedMs() + seconds * 1000;
      startResendCountdownAt(new Date(deadlineMs));
    },
    [nowCorrectedMs, startResendCountdownAt],
  );

  const resetCountdowns = useCallback(() => {
    clearResendInterval();
    clearExpireInterval();
    resendDeadlineMsRef.current = null;
    expireDeadlineMsRef.current = null;
    setResendCountdown(0);
    setOtpExpireCountdown(0);
  }, [clearResendInterval, clearExpireInterval]);

  useEffect(() => {
    return () => {
      clearResendInterval();
      clearExpireInterval();
    };
  }, [clearResendInterval, clearExpireInterval]);

  return {
    canResend: resendCountdown === 0,
    isExpired: otpExpireCountdown === 0,

    startExpireCountdownAt,
    startResendCountdownAt,
    startResendCountdownSeconds,

    resetCountdowns,

    formattedResendTime: formatTime(resendCountdown),
    formattedExpireTime: formatTime(otpExpireCountdown),
  };
}
