import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import SearchInput from "./SearchInput"

interface Props {
  searchValue: string
  onSearchChange: (value: string) => void
  onSearch: (value: string) => void
  placeholder: string
  customAddText: string
  onAdd: () => void
}

const TableHeader = ({
  searchValue,
  onSearchChange,
  onSearch,
  placeholder,
  customAddText,
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

      <Button
        onClick={onAdd}
        variant="outline"
        className="group-[.mode--light]:bg-white/12! group-[.mode--light]:text-slate-200! group-[.mode--light]:border-transparent!"
      >
        <Plus/>
        {customAddText}
      </Button>
    </div>
  )
}

export default TableHeader
