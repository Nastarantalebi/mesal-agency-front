
export type Option = { label: string; value: string };

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;  
  placeholder?: string;
  className?: string;
};

const DropDownlist = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
}: Props) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`px-3 py-2 border rounded-lg ${className}`}
    >
      <option value="">{placeholder}</option>

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default DropDownlist;
