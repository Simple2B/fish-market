import { CreateProductType } from "../../main.type";

export enum CreateProductActionKeys {
  ADD_PRODUCT_VALUE = "ADD_PRODUCT_VALUE",
  SET_SOLD_BY = "SET_SOLD_BY",
  ADDED_PREP = "ADDED_PREP",
  RESET_DATA = "RESET_DATA",
}

export interface ISetAddProductInfo {
  type: CreateProductActionKeys.ADD_PRODUCT_VALUE;
  payload: Partial<Omit<CreateProductType, "preps">>;
}

export interface IResetData {
  type: CreateProductActionKeys.RESET_DATA;
}

export type CreateProductAction = ISetAddProductInfo | IResetData;
