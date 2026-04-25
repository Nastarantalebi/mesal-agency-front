import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import type {
  BadRequestError,
  UnauthorizedError,
  UnhandledException,
  ValidationError,
} from "@/types/http-errors.interface";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleHttpError = (error: any) => {
  const status = error?.response?.status;

  const errorMessage = `${
    error.message ||
    error.exception ||
    error.data.error_message ||
    "یک خطای ناشناخته رخ داده است"
  }
         ${
           error.blockers ||
           (error.data?.errors &&
             Object.values(error.data.errors).flat().length > 0 &&
             Object.values(error.data.errors).flat()[0]) ||
           (error.data?.error_message && error.data.error_message) ||
           (error.errors &&
             Object.values(error.errors).flat().length > 0 &&
             Object.values(error.errors).flat()[0]) ||
           ""
         }`;

  if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
    toast.error("پاسخی از سرور دریافت نشد.لطفا دوباره تلاش کنید")
    // showToastify({
    //   message: "پاسخی از سرور دریافت نشد.لطفا دوباره تلاش کنید",
    //   type: "error",
    // });
    return;
  }
  if (!error.response) {
    toast.error("خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.")
    // showToastify({
    //   message: "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.",
    //   type: "error",
    // });
    return;
  }
  switch (status) {
    case 400:
      if (error.errors) throw error as ValidationError;
      throw error as BadRequestError;

    case 401:
      // Refresh قبلاً در sendRequest امتحان شده
      // اینجا فقط redirect می‌کنیم
      // window.location.href = "/login";
      throw {
        ...error,
        detail: "احراز هویت منقضی شده است، لطفا مجددا وارد شوید",
      } as UnauthorizedError;

    case 403:
      throw {
        ...error,
        detail: "دسترسی به سرویس مورد نظر امکان پذیر نمی باشد",
      } as UnauthorizedError;

    case 404:
      // window.location.replace('/404');
      throw error;

    case 500:
      throw {
        ...error,
        detail: "خطای سرور",
      } as UnhandledException;

    default:
      throw new Error(errorMessage);
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
  queryCache: new QueryCache({
    onError: handleHttpError, // برای useQuery
  }),
  mutationCache: new MutationCache({
    onError: handleHttpError, // برای useMutation
  }),
});