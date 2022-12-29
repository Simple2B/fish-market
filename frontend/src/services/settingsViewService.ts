import { API_BASE_URL, TOKEN_KEY } from "../constants";
import { IUserBusinessInfo } from "../main.type";
import { setRequestHeaders } from "../utils";

export const getUserBusinessInfo = async (): Promise<IUserBusinessInfo> => {
  const res = await fetch(`${API_BASE_URL}/business/`, {
    method: "GET",
    headers: setRequestHeaders(TOKEN_KEY),
  });

  if (!res.ok) {
    localStorage.removeItem(TOKEN_KEY);
    console.error("Bad login");
    throw new Error("Business not found");
  }

  const data: IUserBusinessInfo = await res.json();

  return data;
};

export const changePasswordRequest = async (data: {
  password: string;
  new_password: string;
}): Promise<{ ok: boolean }> => {
  const res = await fetch(`${API_BASE_URL}/change-password`, {
    method: "PATCH",
    headers: setRequestHeaders(TOKEN_KEY),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Bad login");
    throw new Error("Can't change password");
  }

  const resData = await res.json();

  return resData;
};
