import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosInstance,
} from "axios";

const LOGIN_URL = import.meta.env.VITE_BACKEND_Login_URL;
// const SUPPORT_URL = import.meta.env.VITE_SUPPORT_URL;
const BACKEND_URL = import.meta.env.VITE_BASE_URL;

// وضعیت‌های مشترک برای مدیریت توکن
let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (v: unknown) => void;
  reject: (e: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  pendingQueue.forEach((p) => (error ? p.reject(error) : p.resolve(null)));
  pendingQueue = [];
};

// تابع کمکی برای اعمال اینترسپتور روی هر اینستنسی که بخواهیم
const attachRefreshInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const original = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (!error.response) {
        return Promise.reject(error);
      }
      const status = error.response.status;
      const data = error.response.data as { code?: string };
      const code = data.code;

      if (status === 403 && code === "permission_denied") {
        window.location.replace("/notAdmin");
        return Promise.reject(error);
      }
      if (status === 401 && code === "USER_NOT_FOUND") {
        window.location.replace("/userNotFound");
        return Promise.reject(error);
      }
      // جلوگیری از رفرش در صفحه لاگین
      if (window.location.pathname.startsWith("/login")) {
        return Promise.reject(error);
      }


      if (status !== 401) {
        return Promise.reject(error);
      }

      if (original._retry) return Promise.reject(error);
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then(() => axiosInstance(original)); // تکرار درخواست با همان اینستنس قبلی
      }

      isRefreshing = true;

      try {
        // عملیات رفرش توکن (مشترک برای همه)
        await axios.post(`${LOGIN_URL}/refresh/`, null, {
          withCredentials: true,
        });

        processQueue(null);
        return axiosInstance(original); // اجرای دوباره درخواست اصلی
      } catch (refreshErr) {
        processQueue(refreshErr);
        console.log(refreshErr);
        window.location.replace("/login");
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    },
  );
};

// ---- ایجاد اینستنس‌ها ----

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  timeout: 15000,
  headers: { Accept: "application/json" },
});

// export const supportAxios = axios.create({
//   baseURL: SUPPORT_URL,
//   withCredentials: true,
//   timeout: 15000,
//   headers: { Accept: "application/json" },
// });

export const plainInstance = axios.create({
  baseURL: LOGIN_URL,
  withCredentials: true,
});

// ---- اعمال اینترسپتور روی هر دو ----
attachRefreshInterceptor(instance);
// attachRefreshInterceptor(supportAxios);

export default instance;
