export enum MarketActionTypes {
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
}

export interface IProduct {
  prepName: string;
  prepId: number;
  qty: number;
}

export interface AddItemAction {
  type: MarketActionTypes.ADD_ITEM;
  payload: IProduct;
}

interface DeleteItemAction {
  type: MarketActionTypes.DELETE_ITEM;
  payload: number;
}

export type MarketActions = AddItemAction | DeleteItemAction;

export interface IBusinessOut {
  logo: string | null;
  name: string;
}