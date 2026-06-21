import { CustomDataTable } from "@/components/list/CustomDataTable";
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
import type { TcreateUsersList } from "../../types";
import { initialValue } from "@/types";
import { useNavigate } from "@tanstack/react-router";

const UsersList = () => {
  const navigate = useNavigate({ from: "/admin/users" });
  console.log(navigate);
  const [openD, setOpen] = useState(false);
  const { getUsers } = useUsers();
  const [search, setSearch] = useState("");

  const form = useForm<TcreateUsersList>({
    resolver: zodResolver(usersFilterValidation),
    defaultValues: usersFilterInitialValues,
  });

  const handleFilter = (values: TcreateUsersList) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...values,
      }),
      replace: true,
    });
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
              setSearch(value);
            }}
            // onAdd={() => {
            //   setOpenModal(true);
            // }}
            searchPlaceHolder="جست و جوی شماره همراه"
            showAction={true}
            columns={UserListColumns}
            data={getUsers.data ?? initialValue}
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
