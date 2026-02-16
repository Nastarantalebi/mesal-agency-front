import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PhotoUploader from "@/components/form/PhotoUploader";
import usePostData from "@/services/usePostData";
import useGetData from "@/services/useGetData";
import type {
  TCRoomTypeImage,
  TCRoomTypesRoom,
  TRoomTypeImageResponse,
  TRoomTypeRoomResponse,
} from "../types";
import { accommodation_url } from "@/data/querykeys";
import useDeleteData from "@/services/useDeleteData";
import { X } from "lucide-react";
import type { TPaginatedResponse } from "@/types";
import { Form } from "@/components/ui/form";
import FormErrorModal from "@/components/FormErrorModal";
import CustomButton from "@/components/form/CustomButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  roomTypeRoomsInitialValues,
  roomTypeRoomValidation,
} from "../fixtures/Validation";
import formTypes from "@/components/form/formInputTypes";
import { RoomFields } from "../fixtures/RoomFields";
import type { TCreateBed } from "../../Beds/types";
import { toast } from "sonner";
import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RoomTypeRoomForm from "./RoomTypeRoomForm";
import RoomTypeRoomList from "./RoomTypeRoomList";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  AccommodationId: string;
  RoomId: string | null;
}

const RoomTypeRooms = ({ open, onOpenChange, title, AccommodationId, RoomId }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="mb-6">{title}</DialogTitle>
        </DialogHeader>
        <RoomTypeRoomForm AccommodationId={AccommodationId} RoomId={RoomId}/>

        <div className="m-5">
          <Card className="shadow-lg shadow-primary/50 ">
            <CardTitle className="text-start pr-7 text-primary">
             لیست اتاق های تعریف شده
            </CardTitle>
            <CardContent className="flex flex-wrap gap-2">
              <RoomTypeRoomList AccommodationId={AccommodationId} RoomId={RoomId}/>
            </CardContent>
          </Card>
        </div>
      </DialogContent>


    </Dialog>
  );
};

export default RoomTypeRooms;
