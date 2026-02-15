import CustomButton from "@/components/form/CustomButton";
import { DoorClosed } from "lucide-react";


interface Props {
  id: string;
  onClick: (id : string) => void;
}

const ListRooms = ({ id, onClick }: Props) => {

  const stopRowClick = (e: React.MouseEvent) => e.stopPropagation();
  return (
    <div onClick={stopRowClick}>
      <CustomButton className="bg-primary/20 hover:bg-primary/40 " type="button" onClick={() => onClick(id)}>
        <DoorClosed className="h-5 w-5 cursor-pointer" strokeWidth={1.5} />
      </CustomButton>
    </div>
  );
};

export default ListRooms;
