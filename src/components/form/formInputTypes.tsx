import CustomCombobox, { type Item } from "./CustomCombobox";
import CustomInput, { type InputType } from "./CustomInput";

export interface Items {
  name: string;
  label: string;
  fieldType?: string;
  isRequired: boolean;
  options?: Item[];
  inputType?: InputType 
}

const formTypes = ({ name, label, fieldType, isRequired, options, inputType }: Items) => {
  switch (fieldType) {
    case "dropdown":
      return (
        <CustomCombobox
          name={name}
          placeholder={label}
          label={label}
          items={options}
          isRequired={isRequired}
        />
      );

    case "input":
      return (
        <CustomInput
          name={name}
          placeholder={label}
          label={label}
          isRequired={isRequired}
          inputType={inputType}
        />
      );

    default:
      return <input type="text" />;
  }
};

export default formTypes;
