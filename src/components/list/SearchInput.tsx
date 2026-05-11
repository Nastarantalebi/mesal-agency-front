import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder: string;
}

const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder,
}: Props) => {
  return (
    <div className="relative max-w-3xs">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />

      <Button
        onClick={() => onSearch(value)}
        className="cursor-pointer absolute left-1 top-1/2 -translate-y-1/2 h-8 w-9 bg-white hover:bg-primary/20"
      >
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput;
