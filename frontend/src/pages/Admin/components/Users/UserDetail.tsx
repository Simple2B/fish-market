import style from "./Users.module.css";
import { CustomBtn } from "../../../../components";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CHECK_TOKEN_LOGIN_A,
  deleteUser,
  getUserById,
  GET_USERS,
  GET_USER_BY_ID,
  notify,
} from "../../../../services";
import {
  IOpenModalData,
  ManagerOutletContext,
  MarketUserDetail,
} from "../../../../main.type";
import { queryClient } from "../../../../queryClient";

type UserDetailProps = {
  id: number;
  openModal: ManagerOutletContext["openModal"];
};

const UserDetail = ({ id, openModal }: UserDetailProps) => {
  const { data } = useQuery({
    queryKey: [GET_USER_BY_ID, id],
    queryFn: getUserById,
    onSuccess(data: MarketUserDetail) {},
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN_A, true]);
    },
  });

  const mutationDeleteUser = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data: { user_id: number }) => {
      console.log("on Success", { data });

      queryClient.invalidateQueries([GET_USERS]);
      notify(`The account №${data.user_id} was deleted`);
    },
    onError: () => {
      console.log("errror");

      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN_A, true]);
    },
  });

  const handlerDeleteUser = () => {
    const openModalData: IOpenModalData = {
      modalTitle: `Are you sure you want to delete the account № ${id}?`,
      modalConfirmLabel: "Delete account",
      confirmCallback: () => mutationDeleteUser.mutate({ user_id: id }),
    };
    openModal(openModalData);
  };

  return (
    <>
      {data && (
        <tr className={style.userDetailContent}>
          <td colSpan={3}>
            <div className={style.userDetailRow}>
              <span>Email: </span>
              {data.email}
            </div>
            <div className={style.userDetailRow}>
              <span>Phone: </span>
              {data.phone_number}
            </div>
            <div className={style.userDetailRow}>
              <span>Address: </span>
              {data.address}
            </div>
          </td>
          <td colSpan={2}>
            <CustomBtn
              btnName="Enter as user"
              additionalStyles={style.activeBtn}
            />
          </td>
          <td colSpan={2}>
            <CustomBtn
              btnName="Freeze account"
              additionalStyles={style.activeBtn}
            />
          </td>
          <td colSpan={2}>
            <CustomBtn
              btnName="Delete user"
              handlerOnClick={handlerDeleteUser}
              additionalStyles={style.activeBtn}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export { UserDetail };
