import CustomButton from "@/components/form/CustomButton";
import { Trash2 } from "lucide-react";



interface Props{
  onClick: () => void;
}

const ListDelete = ({onClick} : Props) => {
  const stopRowClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div onClick={stopRowClick}>
      <CustomButton className=" border bg-red-100  hover:bg-red-200" type="button" onClick={onClick}>
        <Trash2 className=" cursor-pointer text-red-700" strokeWidth={1.5}  />
      </CustomButton>
    </div>
  );
};

export default ListDelete;
