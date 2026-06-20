import CustomTab from "@/components/tabs/CustomTab";
import { Separator } from "@/components/ui/separator";
import { loginTabItems } from "../fixtures/LoginTabItems";
import { cn } from "@/lib/utils";

// import { useEffect } from "react";
// import LoadingMain from "../../../components/loading/LoadingMain";
// import { cn } from "../../../lib/utils";
// import useRefresh from "../_services/useRefresh";
// import CustomTabs from "../../../components/tabs/Tabs";
// import useTabItems from "../_hooks/useTabItems";

// export default function Login() {
//   const { mutateAsync, isPending } = useRefresh();

//   const { tabItems } = useTabItems();

//   useEffect(() => {
//     clearAuth();
//     mutateAsync();
//     localStorage.clear();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (isPending) return <LoadingMain />;

//   return (
//     <div className="lg:h-screen overflow-y-auto">
//       <div className="container h-full grid grid-cols-12 lg:max-w-387.5 2xl:max-w-437.5 py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:ps-14 lg:pe-12 xl:px-24">
//         <div
//           className={cn([
//             "relative z-50 flex flex-col justify-center h-full col-span-12 p-7 sm:p-14 bg-white rounded-2xl lg:bg-transparent lg:ps-10 lg:col-span-5 xl:ps-24  2xl:col-span-4 lg:p-0",
//             "before:content-[''] before:absolute before:inset-0 before:-mb-3.5 before:bg-white/40 before:rounded-2xl before:mx-5",
//           ])}
//         >
//           <div className="relative z-10 flex flex-col justify-center w-full h-full py-2">
//             <div className="mx-auto">
//               <img src="/logo.svg" alt="logo" className="h-12 w-32 pb-4 w" />
//               <div className="text-xl font-medium text-center">ورود</div>
//             </div>

//             <div className="mt-10">
//               <CustomTabs items={tabItems} defaultValue="1" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-387.5 2xl:max-w-437.5 ps-14 pe-12 xl:px-24">
//         <div
//           className={cn([
//             "relative h-screen col-span-12 lg:col-span-6 2xl:col-span-5 z-20",
//             "after:bg-white after:hidden after:lg:block after:content-[''] after:absolute after:end-0 after:inset-y-0 after:bg-linear-to-b after:from-white after:to-slate-100/80 after:w-[800%] after:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] rtl:rounded-[1.2rem_0_0_1.2rem/1.7rem_0_0_1.7rem]",
//             "before:content-[''] before:hidden before:lg:block before:absolute before:end-0 before:inset-y-0 before:my-6 before:bg-linear-to-b before:from-white/10 before:to-slate-50/10 before:bg-white/50 before:w-[800%] before:-me-4 before:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] rtl:rounded-[1.2rem_0_0_1.2rem/1.7rem_0_0_1.7rem]",
//           ])}
//         ></div>
//         <div
//           className={cn([
//             "h-full col-span-6 2xl:col-span-7 lg:relative",
//             "before:content-[''] before:absolute before:lg:-ms-10 before:start-0 before:inset-y-0 before:bg-linear-to-b before:from-primary-40/80 before:to-gray-40/80 before:w-screen before:lg:w-[800%]",
//             "after:content-[''] after:absolute after:inset-y-0 after:start-0 after:w-screen after:lg:w-[800%] after:bg-white/10 after:bg-fixed after:bg-center after:lg:bg-position-[25rem_-25rem] after:bg-no-repeat",
//           ])}
//         >
//           <div className="sticky top-0 z-10 flex-col justify-center items-end hidden h-screen ms-16 lg:flex xl:ms-28 2xl:ms-36">
//             <img
//               src="/auth-img.svg"
//               alt="login-image"
//               width={600}
//               height={600}
//               className="object-contain"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

const Login = () => {
  return (
    <div className="lg:h-screen ">
      <div className="container h-full grid grid-cols-12 lg:max-w-387.5 2xl:max-w-437.5 py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:ps-14 lg:pe-12 xl:px-24">
        <div
          className={cn([
            "relative z-50 flex flex-col justify-center h-full col-span-12 p-7 sm:p-14 bg-white rounded-2xl lg:bg-transparent lg:ps-10 lg:col-span-5 xl:ps-24  2xl:col-span-4 lg:p-0",
            "before:content-[''] before:absolute before:inset-0 before:-mb-3.5 before:bg-white/40 before:rounded-2xl before:mx-5",
          ])}
        >
          <div className="relative z-10 flex flex-col justify-center w-full h-full py-2">
            <div className="mx-auto mb-2">ورود به حساب کاربری</div>

            <Separator className="bg-slate-200" />
            <div className="mt-10">
              <CustomTab tabItems={loginTabItems} />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-387.5 2xl:max-w-437.5 ps-14 pe-12 xl:px-24">
        <div
          className={cn([
            "relative h-screen col-span-12 lg:col-span-6 2xl:col-span-5 z-20",
            "after:bg-white after:hidden after:lg:block after:content-[''] after:absolute after:end-0 after:inset-y-0 after:bg-linear-to-b after:from-white after:to-slate-100/80 after:w-[800%] after:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] rtl:rounded-[1.2rem_0_0_1.2rem/1.7rem_0_0_1.7rem]",
            "before:content-[''] before:hidden before:lg:block before:absolute before:end-0 before:inset-y-0 before:my-6 before:bg-linear-to-b before:from-white/10 before:to-slate-50/10 before:bg-white/50 before:w-[800%] before:-me-4 before:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] rtl:rounded-[1.2rem_0_0_1.2rem/1.7rem_0_0_1.7rem]",
          ])}
        ></div>
        <div
          className={cn([
            "h-full col-span-6 2xl:col-span-7 lg:relative",
            "before:content-[''] before:absolute before:lg:-ms-10 before:start-0 before:inset-y-0 before:bg-linear-to-b before:from-primary-40/80 before:to-gray-40/80 before:w-screen before:lg:w-[800%]",
            "after:content-[''] after:absolute after:inset-y-0 after:start-0 after:w-screen after:lg:w-[800%] after:bg-white/10 after:bg-fixed after:bg-center after:lg:bg-position-[25rem_-25rem] after:bg-no-repeat",
          ])}
        >
          <div className="sticky top-0 z-10 flex-col justify-center items-end hidden h-screen ms-16 lg:flex xl:ms-28 2xl:ms-36">
            <img
              src="/loginimg3.jpg"
              alt="login-image"
              width={600}
              height={600}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
  // return (

  //   <div className="flex h-screen overflow-hidden">
  //     {/* login form centered */}
  //     <div className="w-1/2 flex items-center justify-center bg-white ">
  //       <div className="rounded-3xl bg-linear-to-bl from-primary to-primary-30 p-6 space-y-4 select-none w-full max-w-sm mx-4">
  //         <h1 className="text-center items-center font-semibold text-white">
  //           ورود به حساب کاربری
  //         </h1>
  //         <Separator className="bg-slate-200" />
  //         <CustomTab tabItems={loginTabItems} />
  //       </div>
  //     </div>
  //     {/* Image */}
  //     <img
  //       src="/loginimg3.jpg"
  //       alt="login-img"
  //       className=" h-full object-cover "
  //     />
  //   </div>
  // );
};

export default Login;
