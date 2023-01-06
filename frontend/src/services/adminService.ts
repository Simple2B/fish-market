import { API_BASE_URL, TOKEN_KEY } from "../constants";
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
