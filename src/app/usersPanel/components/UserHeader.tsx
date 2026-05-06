import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

const UserHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <header className=" mx-5 my-2 flex h-14 items-center px-4 border-b">
        <div className="flex items-center gap-5 text-primary ">
          <span
            onClick={() => navigate({ to: "/" })}
            className="cursor-pointer"
          >
            <div className="w-15 h-15 flex justify-center items-center">
              <img src="./logo.webp" alt="logo" className="w-fit h-fit" />
            </div>
          </span>
          <div className="w-full h-10 relative rounded-2xl border border-gray-200">
            <input
              type="text"
              placeholder="جستجو شهر..."
              className="w-full h-full px-4 pr-10 rounded-2xl outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default UserHeader;
