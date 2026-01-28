import { Button } from "@base-ui/react";

interface Props {
  ispending: boolean;
}

const Submitbutton = ({ ispending }: Props) => {
  return (
    <Button
      className="cursor-pointer px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
      type="submit"
      disabled={ispending}
    >
      ثبت اطلاعات
    </Button>
  );
};

export default Submitbutton;
