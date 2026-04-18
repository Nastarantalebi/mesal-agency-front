import { CustomDataTable } from "@/components/list/CustomDataTable";
import ListPagination from "@/components/list/ListPagination";
import { useState } from "react";
import { UserListColumns } from "../../fixtures/useListColumns";
import { useUsers } from "../../services/useSetting";
import ListWatch from "./ListWatch";
import FilterList from "@/components/list/FilterList";
import FilterModal from "@/components/list/FilterModal";
import { userFields } from "../../fixtures/usersFilterFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  usersFilterInitialValues,
  usersFilterValidation,
} from "../../fixtures/validation";
import type { createUsersList } from "../../types";

const usersList = () => {
  const [mobileInput, setMobileInput] = useState("");
  const [staffInput, setStaffInput] = useState(false);
  // const [input, setInput] = useState("");
  const [openD, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { getUsers } = useUsers(mobileInput, staffInput, currentPage);
  // const [filters, setFilters] = useState<createUsersList>(usersFilterInitialValues);

  const PageCount = getUsers.data?.count
    ? Math.ceil(getUsers.data.count / 10)
    : 0;

  const form = useForm<createUsersList>({
    resolver: zodResolver(usersFilterValidation),
    defaultValues: usersFilterInitialValues,
  });

  // const deleteMessage = "آیا از حذف آیتم اطمینان دارید؟";

  const handleFilter = (values: createUsersList) => {
    setMobileInput(values.mobile);
    console.log("is_sataff", values.is_staff)
    setStaffInput(values.is_staff);
    setCurrentPage(1);
    setOpen(false)
  };

  return (
    <>
      <div className="px-2 sm:px-0">
        {/* <SearchInput
          input={input}
          setInput={setInput}
          setSearchInput={setSearchInput}
          placeholder="جست و جوی شماره همراه"
        /> */}

        <div className="overflow-x-auto rounded-md mt-4 space-y-2">
          <FilterList onClick={() => setOpen(true)} />
          <CustomDataTable
            showAction={true}
            columns={UserListColumns}
            data={getUsers.data?.results ?? []}
            extraAction={() => (
              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                <ListWatch />
              </div>
            )}
          />
        </div>

        <div className="mt-7 flex justify-center">
          <ListPagination
            pageCount={PageCount}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
        <FilterModal<createUsersList>
          open={openD}
          onOpenchange={setOpen}
          fields={userFields}
          form={form}
          handleSubmit={handleFilter}
        />
      </div>

      {/* <FormErrorModal
        open={openD}
        onOpenChange={() => setOpenDelete(false)}
        message={deleteMessage}
        onAcknowledge={() =>
          deleteAccommodation.mutateAsync({ id: selected?.id! })
        }
        buttonTitle="بله"
        dialogTitle="حذف"
      /> */}
    </>
  );
};

export default usersList;
