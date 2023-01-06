import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../../../components";
import { queryClient } from "../../../../queryClient";
import {
  CHECK_TOKEN_LOGIN_A,
  getAllUsers,
  GET_USERS,
} from "../../../../services";
import style from "./Users.module.css";

type Props = {};

const Users = (props: Props) => {
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
    <>{data && data.map((el) => <div>{el.username}</div>)}</>
  );
};

export { Users };
