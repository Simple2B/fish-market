import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../../../components";
import { ManagerOutletContext } from "../../../../main.type";
import { queryClient } from "../../../../queryClient";
import {
  CHECK_TOKEN_LOGIN_A,
  getAllUsers,
  GET_USERS,
} from "../../../../services";

import { MarketUser } from "../../Admin.type";
import { FunctionalPanel } from "../FunctionalPanel";
import { User } from "./User";
import style from "./Users.module.css";

type Props = {
  openModal: ManagerOutletContext["openModal"];
  handlerRegisterNewUser: () => void;
};

const Users = ({ openModal, handlerRegisterNewUser }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_USERS],
    queryFn: getAllUsers,
    onSuccess: () => {
      console.log("onSuccess");
    },
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN_A, true]);
    },
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={style.usersContent}>
      <FunctionalPanel handlerRegisterNewUser={handlerRegisterNewUser} />
      <table className={style.informationPanel}>
        <thead className={style.informationPanelWrap}>
          <tr>
            <th>User name</th>
            <th>User number</th>
            <th>Orders taken</th>
            <th>Items sold</th>
            <th>kg sold</th>
            <th>Meter sold</th>
            <th>SMS used</th>
            <th>Status</th>
            <th>User type</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user: MarketUser) => (
              <User key={user.id} {...user} openModal={openModal} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export { Users };
