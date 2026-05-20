import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import SearchInput from "./SearchInput";

interface Props {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder: string;
  customAddText: string;
  onAdd: () => void;
  showAddButton?: boolean;
}

const TableHeader = ({
  searchValue,
  onSearchChange,
  onSearch,
  placeholder,
  customAddText,
  showAddButton,
  onAdd,
}: Props) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <SearchInput
        value={searchValue}
        placeholder={placeholder}
        onChange={onSearchChange}
        onSearch={onSearch}
      />
      {showAddButton && (
        <Button
          onClick={onAdd}
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-50 hover:text-green-600 w-full sm:w-auto"
        >
          <Plus />
          {customAddText}
        </Button>
      )}
    </div>
  );
};

export default TableHeader;
