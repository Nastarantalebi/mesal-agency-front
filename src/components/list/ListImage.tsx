import { ImagePlus } from "lucide-react";
import CustomButton from "../form/CustomButton";

interface Props {
  id: string;
  onClick: (id : string) => void;
}

const ListImage = ({ id, onClick }: Props) => {

  const stopRowClick = (e: React.MouseEvent) => e.stopPropagation();
  return (
    <div onClick={stopRowClick}>
      <CustomButton className="bg-primary/20 hover:bg-primary/40 " type="button" onClick={() => onClick(id)}>
        <ImagePlus className="h-5 w-5 cursor-pointer" strokeWidth={1.5} />
      </CustomButton>
    </div>
  );
};

export default ListImage;
