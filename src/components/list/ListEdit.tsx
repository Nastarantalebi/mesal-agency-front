import { SquarePen } from "lucide-react";
import CustomButton from "../form/CustomButton";

interface Props {
  id: string;
  onClick: (id: string) => void;
}

const ListEdit = ({ id, onClick }: Props) => {
  // جلوگیری از کلیک روی ردیف جدول
  const stopRowClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div onClick={stopRowClick}>
      <CustomButton className="bg-primary/20 hover:bg-primary/40" type="button" onClick={() => onClick(id)}>
        <SquarePen className="h-5 w-5 cursor-pointer" strokeWidth={1.5} />
      </CustomButton>
    </div>
  );
};

export default ListEdit;
