import { Reducer } from "react";
import { CreateProductType, ItemUnit } from "../../main.type";
import {
  CreateProductAction,
  CreateProductActionKeys,
} from "./AddProduct.type";

export const initialStateProduct: CreateProductType = {
  name: "",
  price: 0,
  sold_by: ItemUnit.unknown,
  image: "",
  preps: [],
};

export const createProductReducer: Reducer<
  CreateProductType,
  CreateProductAction
> = (state, action) => {
  switch (action.type) {
    case CreateProductActionKeys.ADD_PRODUCT_VALUE:
      return { ...state, ...action.payload };
    case CreateProductActionKeys.RESET_DATA:
      return initialStateProduct;
    default:
      return state;
  }
};
