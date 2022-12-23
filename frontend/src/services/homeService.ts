import { toast } from "react-toastify";
import { API_BASE_URL } from "../constants";
import { OrderData, OrderStatus } from "../main.type";
import { TOKEN_KEY } from "./queryKeys";

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

export const changeOrder = async (data: {
  order_id: number;
  body: { new_status: string };
}) => {
  const res = await fetch(`${API_BASE_URL}/order/${data.order_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
    body: JSON.stringify(data.body),
  });
};

export const removeOrder = async (data: { order_id: number }) => {
  const res = await fetch(`${API_BASE_URL}/order/${data.order_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  });
};

export const rebuildUrl = (url: string) => {
  return url.toLocaleLowerCase().replace(/\s+/g, "-");
};

export const isFilterInProgress = (order: OrderData) => {
  return (
    order.status === OrderStatus.in_progress ||
    order.status === OrderStatus.ready
  );
};

export const isFilterCreated = (order: OrderData) => {
  return order.status === OrderStatus.created;
};

export const isFilterPending = (order: OrderData) => {
  return order.status === OrderStatus.pending;
};

export type FilteringFunctions =
  | typeof isFilterInProgress
  | typeof isFilterCreated
  | typeof isFilterPending;

export type FilterBtnItem = {
  filterFn: FilteringFunctions;
  name: string;
};

export const notify = (message: string) =>
  toast(message, {
    position: "top-center",
    autoClose: 10000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
