import style from "./Users.module.css";
import { MarketUser } from "../../Admin.type";
import { useState } from "react";
import { UserDetail } from "./UserDetail";

const User = (props: MarketUser) => {
  const [showUserDetail, setShowUserDetail] = useState<boolean>(false);

  const handlerOnUser = () => {
    setShowUserDetail((c) => !c);
  };

  return (
    <>
      <tr className={style.userContent} onClick={handlerOnUser}>
        <td>{props.username}</td>
        <td>{props.id}</td>
        <td>{props.orders_taken}</td>
        <td>{props.items_sold}</td>
        <td>{props.kg_sold}</td>
        <td>{props.meter_sold}</td>
        <td>{props.sms_used}</td>
        <td>{props.is_active ? "Active" : "Frozen"}</td>
        <td>{props.user_type}</td>
      </tr>
      {showUserDetail && <UserDetail id={props.id} />}
    </>
  );
};

export { User };
