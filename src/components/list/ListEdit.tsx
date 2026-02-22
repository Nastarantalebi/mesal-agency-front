import { SquarePen } from "lucide-react";
import CustomButton from "../form/CustomButton";

interface Props {
  onClick: () => void;
}

const ListEdit = ({ onClick }: Props) => {
  const stopRowClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div onClick={stopRowClick}>
      <CustomButton className="bg-primary/20 hover:bg-primary/40" type="button" onClick={onClick}>
        <SquarePen className="h-5 w-5 cursor-pointer" strokeWidth={1.5} />
      </CustomButton>
    </div>
  );
};

export default ListEdit;
