import { CreateProduct } from "../../main.type";

export enum CreateProductTypes {
  ADD_PRODUCT_VALUE = "ADD_PRODUCT_VALUE",
  SET_SOLD_BY = "SET_SOLD_BY",
  ADDED_PREP = "ADDED_PREP",
  RESET_DATA = "RESET_DATA",
}

export interface ISetAddProductInfo {
  type: CreateProductTypes.ADD_PRODUCT_VALUE;
  payload: Partial<Omit<CreateProduct, "preps">>;
}

export interface IResetData {
  type: CreateProductTypes.RESET_DATA;
}

export type CreateProductAction = ISetAddProductInfo | IResetData;
