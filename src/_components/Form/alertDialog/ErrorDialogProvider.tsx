import { AlertDialogTitle,   AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,} from "@/components/ui/alert-dialog";
import { useNavigate } from "@tanstack/react-router";

import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface ErrorDialogState {
  isOpen: boolean;
  title: string;
  description: string;
  showBack?: boolean;
}

interface ErrorDialogContextType {
  showError: (
    title: string,
    description: string,
    options?: { showBack?: boolean },
    callbacks?: {
      onHide?: () => void;
      onBack?: () => void;
    },
  ) => void;
  hideError: () => void;
}

let externalShowError: ErrorDialogContextType["showError"] | null = null;

// eslint-disable-next-line react-refresh/only-export-components
export function showGlobalError(
  ...args: Parameters<ErrorDialogContextType["showError"]>
) {
  if (externalShowError) {
    externalShowError(...args);
  } else {
    console.warn("ErrorDialogProvider is not mounted yet");
  }
}

const ErrorDialogContext = createContext<ErrorDialogContextType | undefined>(
  undefined,
);

// eslint-disable-next-line react-refresh/only-export-components
export function useErrorDialog() {
  const context = useContext(ErrorDialogContext);
  if (!context) {
    throw new Error("useErrorDialog must be used within ErrorDialogProvider");
  }
  return context;
}

interface ErrorDialogProviderProps {
  children: ReactNode;
}

export function ErrorDialogProvider({ children }: ErrorDialogProviderProps) {
  const navigate = useNavigate();
  const [state, setState] = useState<ErrorDialogState>({
    isOpen: false,
    title: "",
    description: "",
    showBack: true,
  });
  const [focusedButton, setFocusedButton] = useState<"ok" | "back">("back");

  const okButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // ✅ SOLUTION 1: Store callbacks in refs to avoid stale closures
  const onHideCallbackRef = useRef<(() => void) | undefined>(undefined);
  const onBackCallbackRef = useRef<(() => void) | undefined>(undefined);

  // ✅ SOLUTION 2: Memoize hideError without dependencies on state
  const hideError = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));

    // Execute callback from ref
    if (onHideCallbackRef.current) {
      onHideCallbackRef.current();
    }
  }, []);

  // ✅ SOLUTION 3: Memoize onBackClick without dependencies on state
  const onBackClick = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));

    if (onBackCallbackRef.current) {
      onBackCallbackRef.current();
    } else {
      navigate({to:"/" });
    }
  }, [navigate]);

  // ✅ SOLUTION 4: Reset focus state in separate effect
  useEffect(() => {
    if (state.isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Defer state update
      requestAnimationFrame(() => {
        setFocusedButton("back");
      });

      const timer = setTimeout(() => {
        backButtonRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    } else {
      if (previousFocusRef.current) {
        requestAnimationFrame(() => {
          previousFocusRef.current?.focus();
        });
      }
    }
  }, [state.isOpen]);

  // Focus the appropriate button
  useEffect(() => {
    if (!state.isOpen) return;

    const button =
      focusedButton === "ok" ? okButtonRef.current : backButtonRef.current;

    if (button) {
      requestAnimationFrame(() => {
        button.focus();
      });
    }
  }, [focusedButton, state.isOpen]);

  // ✅ SOLUTION 5: Memoize keyboard handler with stable dependencies
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!state.isOpen) return;

      const dialogElement = document.querySelector('[role="alertdialog"]');
      if (!dialogElement) return;

      const isRelevantKey = [
        "ArrowLeft",
        "ArrowRight",
        "Enter",
        "Escape",
      ].includes(e.key);

      if (!isRelevantKey) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      switch (e.key) {
        case "ArrowLeft":
          setFocusedButton("back");
          break;

        case "ArrowRight":
          setFocusedButton("ok");
          break;

        case "Enter":
          if (focusedButton === "ok") {
            hideError();
          } else {
            onBackClick();
          }
          break;

        case "Escape":
          onBackClick();
          break;

        default:
          break;
      }
    },
    [state.isOpen, focusedButton, hideError, onBackClick],
  );

  // Global keyboard handler
  useEffect(() => {
    if (!state.isOpen) return;

    document.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [state.isOpen, handleKeyDown]);

  // ✅ SOLUTION 6: Update callback refs when showError is called
  const showError = useCallback(
    (
      title: string,
      description: string,
      options?: { showBack?: boolean },
      callbacks?: {
        onHide?: () => void;
        onBack?: () => void;
      },
    ) => {
      // Store callbacks in refs
      onHideCallbackRef.current = callbacks?.onHide;
      onBackCallbackRef.current = callbacks?.onBack;

      setState({
        isOpen: true,
        title,
        description,
        showBack: options?.showBack ?? true,
      });
    },
    [],
  );

  useEffect(() => {
    externalShowError = showError;
    return () => {
      externalShowError = null;
    };
  }, [showError]);

  // ✅ SOLUTION 7: Memoize click handlers
  const handleOkClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      hideError();
    },
    [hideError],
  );

  // const handleBackClickButton = useCallback(
  //   (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     onBackClick();
  //   },
  //   [onBackClick],
  // );

  return (
    <ErrorDialogContext.Provider value={{ showError, hideError }}>
      {children}

      <AlertDialog open={state.isOpen} onOpenChange={hideError}>
        <AlertDialogContent className="z-100">
          <AlertDialogHeader>
            <div className="w-full flex justify-center">
              <div className="size-16 bg-destructive/80 rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.35),inset_0_-4px_6px_rgba(255,255,255,0.5)] flex items-center justify-center">
                <X className="text-white size-10" />
              </div>
            </div>
            <AlertDialogTitle className="text-destructive">
              {state.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-foreground text-wrap max-w-md">
              {state.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-4">
            <AlertDialogAction
              ref={okButtonRef}
              onFocus={() => setFocusedButton("ok")}
              onMouseEnter={() => setFocusedButton("ok")}
              onClick={handleOkClick}
              className="bg-white border border-destructive text-destructive! rounded-lg hover:bg-destructive-10! focus-visible:bg-destructive-10!"
              aria-label="متوجه شدم"
            >
              متوجه شدم
            </AlertDialogAction>

            {/* {state.showBack && (
              <AlertDialogAction
                ref={backButtonRef}
                onFocus={() => setFocusedButton("back")}
                onMouseEnter={() => setFocusedButton("back")}
                onClick={handleBackClickButton}
                className="bg-white! text-gray-80! border rounded-lg hover:bg-gray-20! focus-visible:bg-gray-20!"
                aria-label="بازگشت"
              >
                بازگشت
              </AlertDialogAction>
            )} */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ErrorDialogContext.Provider>
  );
}
