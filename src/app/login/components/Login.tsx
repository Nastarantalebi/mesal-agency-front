import CustomTab from "@/components/tabs/CustomTab";
import { Separator } from "@/components/ui/separator";
import { loginTabItems } from "../fixtures/LoginTabItems";

const Login = () => {

  return (
    <div className="w-full max-w-100 min-w-62.5 rounded-[2rem] bg-linear-to-bl from-primary to-primary-30 p-6 space-y-4 select-none">
      <h1 className="text-center font-semibold text-white">
        ورود به حساب کاربری
      </h1>
      <Separator className="bg-slate-200" />
      <CustomTab tabItems={loginTabItems} />
    </div>
  );
};

export default Login;
