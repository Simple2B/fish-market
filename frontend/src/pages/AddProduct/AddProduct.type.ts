import { CreateProductType } from "../../main.type";

export enum CreateProductActionKeys {
  ADD_PRODUCT_VALUE = "ADD_PRODUCT_VALUE",
  SET_SOLD_BY = "SET_SOLD_BY",
  ADDED_PREP = "ADDED_PREP",
  ACTIVATE_DEACTIVATE_PREP = "ACTIVATE_DEACTIVATE_PREP",
  DELETE_PREP = "DELETE_PREP",
  RESET_DATA = "RESET_DATA",
}

export interface ISetAddProductInfo {
  type: CreateProductActionKeys.ADD_PRODUCT_VALUE;
  payload: Partial<Omit<CreateProductType, "preps">>;
}

export interface IAddProductPreps {
  type: CreateProductActionKeys.ADDED_PREP;
  payload: { name: string };
}

export interface IActivateDeactivatePreps {
  type: CreateProductActionKeys.ACTIVATE_DEACTIVATE_PREP;
  payload: { id: number };
}
export interface IDeletePrep {
  type: CreateProductActionKeys.DELETE_PREP;
  payload: { id: number };
}

export interface IResetData {
  type: CreateProductActionKeys.RESET_DATA;
}

export type CreateProductAction =
  | ISetAddProductInfo
  | IAddProductPreps
  | IResetData
  | IActivateDeactivatePreps
  | IDeletePrep;
