import { API_BASE_URL } from "../constants";
import { OrderData, OrderStatus } from "../main.type";

export const loginUser = async (dataForm: {
  email: string;
  password: string;
}) => {
  const params = new URLSearchParams();
  params.append("grant_type", "");
  params.append("username", dataForm.email);
  params.append("password", dataForm.password);
  params.append("scope", "");
  params.append("client_id", "");
  params.append("client_secret", "");

  params;

  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    body: params,
  });
  if (!res.ok) {
    throw new Error("FAILED TO LOGIN USER");
  }
  return await res.json();
};

export const rebuildUrl = (url: string) => {
  return url.toLocaleLowerCase().replace(/ /g, "-");
};

export const setFilterInProgress = (order: OrderData) => {
  return (
    order.status === OrderStatus.in_progress ||
    order.status === OrderStatus.ready
  );
};

export const setFilterCreated = (order: OrderData) => {
  return order.status === OrderStatus.created;
};

export const setFilterPending = (order: OrderData) => {
  return order.status === OrderStatus.pending;
};

export type FilteringFunctions =
  | typeof setFilterInProgress
  | typeof setFilterCreated
  | typeof setFilterPending;

export type FilterBtnItem = {
  filterFn: FilteringFunctions;
  name: string;
};
