import { Link } from "@tanstack/react-router";
import { SquarePen } from "lucide-react";

interface Props {
  id: string;
}

const ListDetails = ({ id }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <Link to="/admin-panel/accommodations/$id/edit" params={{ id: id }}>
        <SquarePen className="h-5 w-5 cursor-pointer" strokeWidth={1.5} />
      </Link>
    </div>
  );
};

export default ListDetails;
