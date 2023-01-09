import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Spinner } from "../../../../components";
import { ManagerOutletContext, MarketUser } from "../../../../main.type";
import { queryClient } from "../../../../queryClient";
import {
  CHECK_TOKEN_LOGIN_A,
  getAllUsers,
  GET_USERS,
} from "../../../../services";

import { FunctionalPanel } from "../FunctionalPanel";
import { User } from "./User";
import style from "./Users.module.css";

type Props = {
  openModal: ManagerOutletContext["openModal"];
  handlerRegisterNewUser: () => void;
};

const Users = ({ openModal, handlerRegisterNewUser }: Props) => {
  const [yearData, setYearData] = useState<number>(0);
  const [monthData, setMonthData] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: [GET_USERS],
    queryFn: getAllUsers,
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN_A, true]);
    },
  });

  const filterUsersByDate = (user: MarketUser) => {
    const userDate = new Date(user.created_at);

    const userYear = userDate.getFullYear();
    const userMonth = userDate.toLocaleString("en-US", { month: "long" });

    if (!yearData || !monthData) return true;

    if (yearData && monthData) {
      return userYear === yearData && monthData === userMonth;
    } else false;
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={style.usersContent}>
      <FunctionalPanel
        handlerRegisterNewUser={handlerRegisterNewUser}
        yearData={yearData}
        monthData={monthData}
        setYearData={setYearData}
        setMonthData={setMonthData}
      />
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
            data
              .filter(filterUsersByDate)
              .map((user: MarketUser) => (
                <User key={user.id} {...user} openModal={openModal} />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export { Users };
