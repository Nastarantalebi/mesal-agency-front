import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

interface Props {
  name: string;
  placeholder: string;
  label: string;
  isRequired: boolean;
  items?: Item[];
}

export interface Item {
  value: string;
  label: string;
}

const CustomCombobox = ({ name, placeholder, label, items, isRequired }: Props) => {

  console.log(items)
  return (
    <div className="w-56  mr-10">
      <label className="block mb-1 mr-3">{label}{isRequired && <span>*</span>}</label>
      <Combobox>
        <ComboboxInput placeholder={placeholder} />
        <ComboboxContent>
          <ComboboxEmpty></ComboboxEmpty>
          <ComboboxList>
            {items?.map((item) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default CustomCombobox;
