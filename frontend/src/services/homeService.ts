import { toast } from "react-toastify";
import { API_BASE_URL, filterBtnNameKeys, TEXT_DATA } from "../constants";
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

export const isOutOfStock = async (data: {
  product_id: number;
  body: { is_out_of_stock: boolean };
}) => {
  const res = await fetch(`${API_BASE_URL}/product/${data.product_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
    body: JSON.stringify(data.body),
  });
};

export const resetOutOfStock = async () => {
  const res = await fetch(`${API_BASE_URL}/product/`, {
    method: "PATCH",
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

export const isFilterCompleted = (order: OrderData) => {
  return order.status === OrderStatus.picked_up;
};

export const isFilterCancelled = (order: OrderData) => {
  return order.status === OrderStatus.can_not_complete;
};

export const sortByData = (orderA: OrderData, orderB: OrderData): number => {
  if (orderA.status == OrderStatus.created) {
    return Date.parse(orderB.pick_up_data!) - Date.parse(orderA.pick_up_data!);
  }
  return Date.parse(orderB.created_at) - Date.parse(orderA.created_at);
};

export type FilteringFunctions =
  | typeof isFilterInProgress
  | typeof isFilterCreated
  | typeof isFilterPending
  | typeof isFilterCompleted
  | typeof isFilterCancelled;

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

export const filterOptionsOrder = [
  {
    name: TEXT_DATA[filterBtnNameKeys.FUTURE_ORDERS].name!,
    filterFn: isFilterCreated,
  },
  {
    name: TEXT_DATA[filterBtnNameKeys.PENDING].name!,
    filterFn: isFilterPending,
  },
  {
    name: TEXT_DATA[filterBtnNameKeys.IN_PROGRESS].name!,
    filterFn: isFilterInProgress,
  },
];

export const filterOptionsArchive = [
  {
    name: TEXT_DATA[filterBtnNameKeys.CANCELLED].name!,
    filterFn: isFilterCancelled,
  },
  {
    name: TEXT_DATA[filterBtnNameKeys.COMPLETED].name!,
    filterFn: isFilterCompleted,
  },
];
