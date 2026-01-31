import { Button } from "../ui/button";

interface Props {
  ispending: boolean;
  children: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
}

const CustomButton = ({ ispending, children, onClick, type = "button" }: Props) => {
  return (
    <Button
      className="cursor-pointer px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
      type={type}
      disabled={ispending}
      onClick={onClick}
    >
     {children}
    </Button>
  );
};

export default CustomButton;
