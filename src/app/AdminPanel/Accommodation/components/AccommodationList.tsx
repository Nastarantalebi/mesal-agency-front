import FormErrorModal from "@/components/form/FormErrorModal";
import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ListDelete from "../../RoomTypes/components/roomTypeListIcons/ListDelete";
import { AccommodationListColumns } from "../fixtures/AccommodationListColumns";
import { useAccommodation } from "../services/useAccommodation";
import type { AccommodationItem } from "../types";
import CustomDialog from "@/components/modal/CustomDialog";
import AccommodationForm from "./AccommodationForm";
import CustomLoader from "@/components/loading/CustomLoader";
import ListEdit from "@/components/list/ListEdit";
import ListImage from "../../RoomTypes/components/roomTypeListIcons/ListImage";
import AccommodationPhotoes from "./AccommodationPhotoes";
import ListFeatures from "../../RoomTypes/components/roomTypeListIcons/ListFeatures";
import AccommodationFeatures from "./AccommodationFeatures";
import ListDate from "../../RoomTypes/components/roomTypeListIcons/ListDate";
import AccommodatioPeakDate from "./AccommodationPeakDate";
import ListRooms from "../../RoomTypes/components/roomTypeListIcons/ListRooms";
import useBreadCrumbTitles from "../../AdminFeatures/stores/useBreadCrumbTitles";

const AccommodationList = () => {
  const [currentAccommodationPage, setCurrentAccommodationPage] = useState(1);
  const [selected, setSelected] = useState<AccommodationItem | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [openFeatures, setOpenFeatures] = useState(false);
  const [openPeakDate, setOpenPeakDate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const setBreadCrumbTitle = useBreadCrumbTitles((state) => state.setBreadCrumbTitle);

  const [search, setSearch] = useState("");

  const { deleteAccommodation, getAccommodations } = useAccommodation(
    undefined,
    currentAccommodationPage,
    search,
  );

  const navigate = useNavigate();

  if (getAccommodations.isFetching)
    return (
      <div>
        <CustomLoader />
      </div>
    );

  if (getAccommodations.error)
    return (
      <div className="text-red-600">{getAccommodations.error.message}</div>
    );

  const pageCount = getAccommodations.data?.count
    ? Math.ceil(getAccommodations.data.count / 10)
    : 0;

  const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";

  return (
    <>
      <div className="px-2 sm:px-0">
        <div className="overflow-x-auto rounded-md mt-4">
          <CustomDataTable
            searchValue={search}
            onSearchChange={setSearch}
            onSearch={(value) => {
              setCurrentAccommodationPage(1);
              setSearch(value);
            }}
            searchPlaceHolder="جست و جوی نام اقامتگاه"
            customAddText="افزودن اقامتگاه"
            onAdd={() => setOpenModal(true)}
            // onRowClick={(rowData) => {
            //   navigate({
            //     to: `/admin/accommodations/${rowData.id}`,
            //   });
            // }}
            extraAction={(rowData) => (
              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                <ListEdit
                  onClick={() => {
                    setSelected(rowData);
                    setOpenModal(true);
                  }}
                />
                <ListImage
                  onClick={() => {
                    setSelected(rowData);
                    setOpenImg(true);
                  }}
                />
                <ListFeatures
                  onClick={() => {
                    setSelected(rowData);
                    setOpenFeatures(true);
                  }}
                />
                <ListDate
                  onClick={() => {
                    setSelected(rowData);
                    setOpenPeakDate(true);
                  }}
                />
                <ListRooms
                  onClick={() => {
                    navigate({
                      to: `/admin/accommodations/${rowData.id}/roomTypes`,
                      search: {
                        name: rowData.name,
                      },
                    });
                    setBreadCrumbTitle([rowData.name])
                  }}
                />
                  <ListDelete
                    onClick={() => {
                      setSelected(rowData);
                      setOpenDelete(true);
                    }}
                  />
              </div>
            )}
            showAction
            columns={AccommodationListColumns}
            data={getAccommodations.data?.results ?? []}
          />
        </div>

        <div className="mt-7 flex justify-center">
          <ListPagination
            pageCount={pageCount}
            currentPage={currentAccommodationPage}
            onPageChange={setCurrentAccommodationPage}
          />
        </div>
      </div>

      <CustomDialog
        dialogContent={<AccommodationForm AccommodationId={selected?.id} />}
        dialogTitle={
          selected
            ? `ویرایش اقامتگاه (${selected?.name})`
            : "افزودن اقامتگاه جدید"
        }
        onOpenChange={() => {
          setOpenModal(false);
          setSelected(null);
        }}
        open={openModal}
        size="xxl"
      />
      <CustomDialog
        dialogContent={<AccommodationPhotoes AccommodationId={selected?.id} />}
        dialogTitle={`عکس های اقامتگاه (${selected?.name})`}
        onOpenChange={() => {
          setOpenImg(false);
          setSelected(null);
        }}
        open={openImg}
        size="xxl"
      />
      <CustomDialog
        dialogContent={<AccommodationFeatures AccommodationId={selected?.id} />}
        dialogTitle={`ویژگی های اقامتگاه (${selected?.name})`}
        onOpenChange={() => {
          setOpenFeatures(false);
          setSelected(null);
        }}
        open={openFeatures}
      />
      <CustomDialog
        dialogContent={<AccommodatioPeakDate AccommodationId={selected?.id} />}
        dialogTitle={`تاریخ های پیک اقامتگاه (${selected?.name})`}
        onOpenChange={() => {
          setOpenPeakDate(false);
          setSelected(null);
        }}
        open={openPeakDate}
      />

      <FormErrorModal
        open={openDelete}
        onOpenChange={() => setOpenDelete(false)}
        message={deleteMessage}
        onAcknowledge={() =>
          deleteAccommodation.mutateAsync({ id: selected?.id! })
        }
        buttonTitle="بله"
        dialogTitle="حذف"
      />
    </>
  );
};

export default AccommodationList;
