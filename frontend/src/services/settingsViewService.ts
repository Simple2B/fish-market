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
