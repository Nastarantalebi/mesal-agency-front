import { Button } from "../ui/button";

interface Props {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const CustomButton = ({
  children,
  onClick,
  type = "button",
  icon,
  iconPosition = "right",
}: Props) => {
  return (
    <Button
      // className="cursor-pointer px-4 py-2.5 rounded-xl text-white hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
      className=""
      type={type}
      onClick={onClick}
    >
      {icon && iconPosition === "left" ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? icon : null}
    </Button>
  );
};

export default CustomButton;
