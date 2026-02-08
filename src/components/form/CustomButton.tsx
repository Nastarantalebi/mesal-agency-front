import * as React from "react";
import { Button } from "../ui/button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
}

const CustomButton = ({
  children,
  icon,
  iconPosition = "right",
  variant,
  size,
  className,
  type,
  ...props
}: Props) => {
  return (
    <Button variant={variant} type={type} size={size} className={className} {...props}>
      {icon && iconPosition === "left" ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? icon : null}
    </Button>
  );
};

export default CustomButton;
