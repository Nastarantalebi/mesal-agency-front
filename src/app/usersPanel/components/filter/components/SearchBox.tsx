import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="bg-primary/10 w-full h-20 mb-5 flex items-center justify-center">
      <div className="flex items-center h-10 w-150 relative border border-gray-200 bg-white rounded-sm">
        <input
          type="text"
          placeholder="جستجوی شهر ..."
          className="px-4 w-full outline-none"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default SearchBox;
