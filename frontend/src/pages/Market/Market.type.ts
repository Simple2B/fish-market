import { ItemUnit } from "./components/ProductList/ProductList.type";

export enum MarketActionTypes {
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
  SET_ORDER_DATA = "SET_ORDER_DATA",
  SET_NUMBER_IS_VERIFIED = "SET_NUMBER_IS_VERIFIED",
  RESET_DATA = "RESET_DATA",
}

export interface IOrder {
  phoneNumber: string;
  isNumberVerified: boolean;
  name: string;
  note: string;
  pick_up_data: Date;
}

export interface ISetOrderData {
  type: MarketActionTypes.SET_ORDER_DATA;
  payload: IOrder;
}

export interface ISetOrderNumberIsVerified {
  type: MarketActionTypes.SET_NUMBER_IS_VERIFIED;
  payload: boolean;
}

export interface IResetOrderData {
  type: MarketActionTypes.RESET_DATA;
}

export type OrderActions =
  | ISetOrderData
  | ISetOrderNumberIsVerified
  | IResetOrderData;

export interface IProduct {
  itemPrice: number;
  itemType: ItemUnit;
  itemName: string;
  itemImage: string;
  prepName: string;
  prepId: number;
  qty: number;
}

export interface AddItemAction {
  type: MarketActionTypes.ADD_ITEM;
  payload: IProduct;
}

export interface DeleteItemAction {
  type: MarketActionTypes.DELETE_ITEM;
  payload: number;
}

export interface ResetCart {
  type: MarketActionTypes.RESET_DATA;
}

export type MarketActions = AddItemAction | DeleteItemAction | ResetCart;

export interface IBusinessOut {
  logo: string | null;
  name: string;
}

export interface IOrderItem {
  prep_id: number;
  qty: number;
  unit_type: string;
}

export type CreateOrderItems = {
  phone_number: string;
  customer_name: string;
  note: string;
  pick_up_data: Date;
  items: IOrderItem[];
};
