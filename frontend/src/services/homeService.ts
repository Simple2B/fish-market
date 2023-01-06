import { QueryFunction, QueryFunctionContext } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  API_BASE_URL,
  filterBtnNameKeys,
  FILTER_BUTTONS,
  TOKEN_KEY,
} from "../constants";
import { OrderData, OrderStatus } from "../main.type";
import { setRequestHeaders } from "../utils";

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

export const isTokenValid = async () => {
  const res = await fetch(`${API_BASE_URL}/me-info`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  });

  if (!res.ok) {
    localStorage.removeItem(TOKEN_KEY);
    console.error("Bad login");
    return false;
  }

  const data = await res.json();

  return data.is_valid;
};

export const changeOrder = async (data: {
  order_id: number;
  body: { new_status: string };
}) => {
  const res = await fetch(`${API_BASE_URL}/order/${data.order_id}`, {
    method: "PATCH",
    headers: setRequestHeaders(TOKEN_KEY),
    body: JSON.stringify(data.body),
  });
};

export const removeOrder = async (data: { order_id: number }) => {
  const res = await fetch(`${API_BASE_URL}/order/${data.order_id}`, {
    method: "DELETE",
    headers: setRequestHeaders(TOKEN_KEY),
  });
};

export const isOutOfStock = async (data: {
  product_id: number;
  body: { is_out_of_stock: boolean };
}) => {
  const res = await fetch(`${API_BASE_URL}/product/${data.product_id}`, {
    method: "PATCH",
    headers: setRequestHeaders(TOKEN_KEY),
    body: JSON.stringify(data.body),
  });
};

export const resetOutOfStock = async () => {
  const res = await fetch(`${API_BASE_URL}/product/`, {
    method: "PATCH",
    headers: setRequestHeaders(TOKEN_KEY),
  });
};

export const rebuildUrl = (url: string) => {
  return url.toLocaleLowerCase().replace(/\s+/g, "-");
};

export const sortByDate = (orderA: OrderData, orderB: OrderData): number => {
  if (orderA.status == OrderStatus.created) {
    return Date.parse(orderB.pick_up_data!) - Date.parse(orderA.pick_up_data!);
  }
  return Date.parse(orderB.created_at) - Date.parse(orderA.created_at);
};

export const getOrders = async ({
  queryKey,
}: QueryFunctionContext<[string, boolean]>) => {
  const [_, is_archive] = queryKey;

  const res = await fetch(`${API_BASE_URL}/order/?is_archive=${is_archive}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  });

  if (!res.ok) {
    localStorage.removeItem(TOKEN_KEY);
    console.error("Bad login");
    throw new Error("Can't get orders");
  }

  const data = await res.json();

  return data.orders;
};

export type FilteringFunctions = (order: OrderData) => boolean;

export type StatusBtnItem = {
  sortFn: (a: OrderData, b: OrderData) => number;
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

export const filterOptionsOrder: StatusBtnItem[] = [
  {
    name: FILTER_BUTTONS[filterBtnNameKeys.FUTURE_ORDERS].name,
    sortFn: (a: OrderData, b: OrderData): number =>
      a.status === OrderStatus.created ? -1 : 0,
  },
  {
    name: FILTER_BUTTONS[filterBtnNameKeys.PENDING].name,
    sortFn: (a: OrderData, b: OrderData): number =>
      a.status === OrderStatus.pending ? -1 : 0,
  },
  {
    name: FILTER_BUTTONS[filterBtnNameKeys.IN_PROGRESS].name,
    sortFn: (a: OrderData, b: OrderData): number => {
      return [OrderStatus.in_progress, OrderStatus.ready].includes(
        a.status as OrderStatus
      )
        ? -1
        : 0;
    },
  },
];

export const filterOptionsArchive: StatusBtnItem[] = [
  {
    name: FILTER_BUTTONS[filterBtnNameKeys.CANCELLED].name,
    sortFn: (a: OrderData, b: OrderData): number =>
      !a.is_deleted && a.status === OrderStatus.can_not_complete ? -1 : 0,
  },
  {
    name: FILTER_BUTTONS[filterBtnNameKeys.COMPLETED].name,
    sortFn: (a: OrderData, b: OrderData): number =>
      !a.is_deleted && a.status === OrderStatus.picked_up ? -1 : 0,
  },
];
