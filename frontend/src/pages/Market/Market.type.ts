import { ItemUnit } from "./components/ProductList/ProductList.type";

export enum MarketActionTypes {
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
  SET_ORDER_DATA = "SET_ORDER_DATA",
}

export interface IOrder {
  phoneNumber: string;
  isNumberVerified: boolean;
  name: string;
  note: string;
}

export interface ISetOrderData {
  type: MarketActionTypes.SET_ORDER_DATA;
  payload: IOrder;
}

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

export type MarketActions = AddItemAction | DeleteItemAction;

export interface IBusinessOut {
  logo: string | null;
  name: string;
}
