// import FormComponent from "@/components/form/FormComponent";
// import { useForm } from "react-hook-form";
// import type { TcreateUsersList } from "../../types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   usersFilterInitialValues,
//   usersFilterValidation,
// } from "../../fixtures/validation";
// import { useUsers } from "../../services/useSetting";
// import type { Dispatch, SetStateAction } from "react";

// const UsersForm = ({
//   setOpenModal,
// }: {
//   setOpenModal: Dispatch<SetStateAction<boolean>>;
//   id?: number;
// }) => {
//   const form = useForm<TcreateUsersList>({
//     resolver: zodResolver(usersFilterValidation),
//     defaultValues: usersFilterInitialValues,
//   });

//   const { postUsers } = useUsers();


//   const handleSubmit = (values: TcreateUsersList) => {
//     postUsers.mutateAsync(values, {
//       onSuccess: () => setOpenModal(false),
//     });

//     // putUser.mutateAsync(
//     //         { data: values, id: Number(values.id) },
//     //         { onSuccess: () => setOpenModal(false) },
//     //       )
//   };

//   return (
//     <FormComponent form={form} handleSubmit={handleSubmit} fields={fields} />
//   );
// };

// export default UsersForm;
