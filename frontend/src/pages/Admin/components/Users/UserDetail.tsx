import style from "./Users.module.css";
import { MarketUserDetail } from "../../Admin.type";
import { CustomBtn } from "../../../../components";
import { useQuery } from "@tanstack/react-query";
import { getUserById, GET_USER_BY_ID } from "../../../../services";
import { IOpenModalData, ManagerOutletContext } from "../../../../main.type";

type UserDetailProps = {
  id: number;
  openModal: ManagerOutletContext["openModal"];
};

const UserDetail = ({ id, openModal }: UserDetailProps) => {
  const { data } = useQuery({
    queryKey: [GET_USER_BY_ID, id],
    queryFn: getUserById,
    onSuccess(data: MarketUserDetail) {},
  });

  const handlerDeleteUser = () => {
    const openModalData: IOpenModalData = {
      modalTitle: `Are you sure you want to delete the account № ${id}?`,
      modalConfirmLabel: "Delete account",
      confirmCallback: () => console.log("delete", id),
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
