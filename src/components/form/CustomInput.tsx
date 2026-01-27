import { Input } from "../ui/input";

interface Props {
  name: string;
  placeholder: string;
  label: string;
  isRequired: boolean;
  inputType?: InputType;
}

export type InputType = "text" | "number" | "email" | "password" | "tel";

const CustomInput = ({name, placeholder, label, isRequired, inputType}: Props) => {
  return (
    <div className="w-56  mr-10">
        <label className="block mb-1 mr-3">{label}{isRequired && <span className="text-red-600">*</span>}</label>
        <Input type={inputType} name={name} placeholder={placeholder}/>
    </div>
  );
};

export default CustomInput;
