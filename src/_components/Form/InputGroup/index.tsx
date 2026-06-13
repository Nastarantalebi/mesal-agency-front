import { createContext, useContext } from "react";
import { twMerge } from "tailwind-merge";

type InputGroupProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"div">;

// eslint-disable-next-line react-refresh/only-export-components
export const inputGroupContext = createContext(false);

function InputGroup(props: InputGroupProps) {
  return (
    <inputGroupContext.Provider value={true}>
      <div {...props} className={twMerge(["flex", props.className])}>
        {props.children}
      </div>
    </inputGroupContext.Provider>
  );
}

// جدا تعریفش کن تا ESLint راضی شود:
function InputGroupText(
  props: React.PropsWithChildren & React.ComponentPropsWithoutRef<"div">
) {
  const inputGroup = useContext(inputGroupContext);
  return (
    <div
      {...props}
      className={twMerge([
        "py-2 px-3 bg-slate-100 border shadow-sm border-slate-300/60 text-slate-600 dark:bg-darkmode-900/20 dark:border-darkmode-900/20 dark:text-slate-400",
        inputGroup &&
          "rounded-none [&:not(:first-child)]:border-s-transparent first:rounded-s last:rounded-e",
        props.className,
      ])}
    >
      {props.children}
    </div>
  );
}

InputGroup.Text = InputGroupText;

export default InputGroup;
