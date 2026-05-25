import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import { useState } from "react";
import { UserListColumns } from "../../fixtures/useListColumns";
import { useUsers } from "../../services/useSetting";
import FilterList from "@/components/list/FilterList";
import FilterModal from "@/components/list/FilterModal";
import { userFields } from "../../fixtures/usersFilterFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  usersFilterInitialValues,
  usersFilterValidation,
} from "../../fixtures/validation";
import ReloadList from "@/components/list/ReloadList";
import type { TcreateUsersList, UsersListResponse } from "../../types";
import ListDelete from "@/app/AdminPanel/RoomTypes/components/roomTypeListIcons/ListDelete";
import FormErrorModal from "@/components/form/FormErrorModal";

const UsersList = () => {
  const [filters, setFilters] = useState<TcreateUsersList>();
  // const [input, setInput] = useState("");
  const [openD, setOpen] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<UsersListResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { getUsers } = useUsers(filters, currentPage);
  // const [filters, setFilters] = useState<createUsersList>(usersFilterInitialValues);
  const [search, setSearch] = useState("");

  const PageCount = getUsers.data?.count
    ? Math.ceil(getUsers.data.count / 10)
    : 0;

  const form = useForm<TcreateUsersList>({
    resolver: zodResolver(usersFilterValidation),
    defaultValues: usersFilterInitialValues,
  });

  // const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";

  const handleFilter = (values: TcreateUsersList) => {
    setFilters(values);
    setCurrentPage(1);
    setOpen(false);
  };

  return (
    <>
      <div className="px-2 sm:px-0">
        <div className="overflow-x-auto rounded-md mt-4 space-y-2">
          <div className="flex flex-row gap-1 justify-end">
            <FilterList onClick={() => setOpen(true)} />
            <ReloadList
              onClick={() => {
                form.reset();
                handleFilter(form.getValues());
              }}
            />
          </div>
          <CustomDataTable
            searchValue={search}
            onSearchChange={setSearch}
            onSearch={(value) => {
              setCurrentPage(1);
              setSearch(value);
            }}
            // onAdd={() => {
            //   setOpenModal(true);
            // }}
            searchPlaceHolder="جست و جوی شماره همراه"
            showAction={true}
            columns={UserListColumns}
            data={getUsers.data?.results ?? []}

          />
        </div>

        <div className="mt-7 flex justify-center">
          <ListPagination
            pageCount={PageCount}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
        {/* <CustomDialog
          dialogContent={<UsersForm setOpenModal={setOpenModal} id={selected} />}
          dialogTitle={selected ? "ویرایش کاربر" : "افزودن کاربر جدید"}
          open={openModal}
          onOpenChange={() => {
            setOpenModal(false);
            setSelected(null);
          }}
        /> */}
        <FilterModal<TcreateUsersList>
          open={openD}
          setOpen={setOpen}
          onOpenchange={setOpen}
          fields={userFields}
          form={form}
          handleSubmit={handleFilter}
        />
      </div>

      {/* <FormErrorModal
        open={openD}
        onOpenChange={() => setOpenDelete(false)}
        onAcknowledge={() =>
          deleteAccommodation.mutateAsync({ id: selected?.id! })
        }
        buttonTitle="بله"
        dialogTitle="حذف"
      /> */}
    </>
  );
};

export default UsersList;
