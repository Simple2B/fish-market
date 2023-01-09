import { QueryFunctionContext } from "@tanstack/react-query";
import { API_BASE_URL, TOKEN_KEY } from "../constants";
import { MarketUser, ObjId } from "../main.type";
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

  return resData.users;
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

export const createNewUser = async (body: {
  user: {
    user_type: string;
    address: string;
    username: string;
    phone_number: string;
    email: string;
    password: string;
  };
  business: { name: string; phone_number: string };
}) => {
  const res = await fetch(`${API_BASE_URL}/user/`, {
    method: "POST",
    headers: setRequestHeaders(TOKEN_KEY),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Bad login");
    throw new Error(`Can't create new user`);
  }

  const resData = await res.json();

  return resData;
};

export const deleteUser = async ({ user_id }: { user_id: number }) => {
  const res = await fetch(`${API_BASE_URL}/user/${user_id}`, {
    method: "DELETE",
    headers: setRequestHeaders(TOKEN_KEY),
  });

  if (!res.ok) {
    console.error("Bad login");
    throw new Error(`Can't delete user user_id ${user_id}`);
  }

  const resData = await res.json();

  return resData;
};

export const freezeUser = async (data: {
  user_id: number;
  body: { is_active: boolean };
}) => {
  const res = await fetch(`${API_BASE_URL}/user/${data.user_id}`, {
    method: "PATCH",
    headers: setRequestHeaders(TOKEN_KEY),
    body: JSON.stringify(data.body),
  });

  if (!res.ok) {
    console.error("Bad login");
    throw new Error(`Can't freeze user user_id ${data.user_id}`);
  }

  const resData = await res.json();

  return resData;
};

export const arrOfMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getYearList = (): Array<number> => {
  const result = new Array<number>();
  const currentYear = new Date().getFullYear();

  for (let year = 2022; year <= currentYear; year++) {
    result.push(year);
  }

  return result;
};

export const getMonthListByYear = (year: number): Array<string> => {
  const result = new Array<string>();
  const currentYear = new Date().getFullYear();

  if (year <= currentYear) {
    let currentMonthIndex = 11;

    if (year === currentYear) {
      currentMonthIndex = new Date().getMonth();
    }

    for (let monthIndex = 0; monthIndex <= currentMonthIndex; monthIndex++) {
      result.push(arrOfMonth[monthIndex]);
    }
  }

  return result;
};

export const loginAsUser = async ({
  queryKey,
}: QueryFunctionContext<[string, number]>) => {
  const [_, id] = queryKey;

  const res = await fetch(`${API_BASE_URL}/login-as-user/${id}`, {
    method: "GET",
    headers: setRequestHeaders(TOKEN_KEY),
  });

  if (!res.ok) {
    console.error("Bad login");
    throw new Error("Can't login as user");
  }

  const resData = await res.json();

  return resData;
};
