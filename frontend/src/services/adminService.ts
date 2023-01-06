import { QueryFunctionContext } from "@tanstack/react-query";
import { API_BASE_URL, TOKEN_KEY } from "../constants";
import { ObjId } from "../main.type";
import { setRequestHeaders } from "../utils";

export const getAllUsers = async () => {
  const res = await fetch(`${API_BASE_URL}/user/all`, {
    method: "GET",
    headers: setRequestHeaders(TOKEN_KEY),
  });

  if (!res.ok) {
    console.error("Bad login");
    throw new Error("Can't get users");
  }

  const resData = await res.json();

  return resData.users.sort((a: ObjId, b: ObjId) => a.id - b.id);
};

export const getUserById = async ({
  queryKey,
}: QueryFunctionContext<[string, number]>) => {
  const [_, id] = queryKey;

  const res = await fetch(`${API_BASE_URL}/user/${id}`, {
    method: "GET",
    headers: setRequestHeaders(TOKEN_KEY),
  });

  if (!res.ok) {
    console.error("Bad login");
    throw new Error(`Can't get user id ${id}`);
  }

  const resData = await res.json();

  return resData;
};
