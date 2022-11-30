export enum MarketActionTypes {
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
}

export interface IProduct {
  id: number;
  qty: number;
}

interface AddItemAction {
  type: MarketActionTypes.ADD_ITEM;
  payload: IProduct;
}

interface DeleteItemAction {
  type: MarketActionTypes.DELETE_ITEM;
  payload: number;
}

export type MarketActions = AddItemAction | DeleteItemAction;
