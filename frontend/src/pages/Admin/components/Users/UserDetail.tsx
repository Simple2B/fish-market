import style from "./Users.module.css";
import { MarketUserDetail } from "../../Admin.type";
import { CustomBtn } from "../../../../components";
import { useQuery } from "@tanstack/react-query";
import { getUserById, GET_USER_BY_ID } from "../../../../services";

type UserDetailProps = {
  id: number;
};

const UserDetail = ({ id }: UserDetailProps) => {
  const { data } = useQuery({
    queryKey: [GET_USER_BY_ID, id],
    queryFn: getUserById,
    onSuccess(data: MarketUserDetail) {},
  });

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
            <CustomBtn btnName="Enter as user" />
          </td>
          <td colSpan={2}>
            <CustomBtn btnName="Freeze account" />
          </td>
          <td colSpan={2}>
            <CustomBtn btnName="Delete user" />
          </td>
        </tr>
      )}
    </>
  );
};

export { UserDetail };
