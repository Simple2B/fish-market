import style from "./Users.module.css";
import { useState } from "react";
import { UserDetail } from "./UserDetail";
import { ManagerOutletContext, MarketUser } from "../../../../main.type";

const User = (
  props: MarketUser & { openModal: ManagerOutletContext["openModal"] }
) => {
  const [showUserDetail, setShowUserDetail] = useState<boolean>(false);

  const handlerOnUser = () => {
    setShowUserDetail((c) => !c);
  };

  return (
    <>
      <tr className={style.userContent} onClick={handlerOnUser}>
        <td>{props.business_name}</td>
        <td>{props.id}</td>
        <td>{props.orders_taken}</td>
        <td>{props.items_sold}</td>
        <td>{props.kg_sold}</td>
        <td>{props.meter_sold}</td>
        <td>{props.sms_used}</td>
        <td>{props.is_active ? "Active" : "Frozen"}</td>
        <td>{props.user_type}</td>
      </tr>
      {showUserDetail && (
        <UserDetail
          id={props.id}
          is_active={props.is_active}
          openModal={props.openModal}
        />
      )}
    </>
  );
};

export { User };
