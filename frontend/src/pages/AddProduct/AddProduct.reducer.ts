import { Reducer } from "react";
import { CreateProduct, ItemUnit } from "../../main.type";
import { CreateProductAction, CreateProductTypes } from "./AddProduct.type";

export const initialStateProduct: CreateProduct = {
  name: "",
  price: 0,
  sold_by: ItemUnit.unknown,
  image: "",
  preps: [],
};

export const createProductReducer: Reducer<
  CreateProduct,
  CreateProductAction
> = (state, action) => {
  switch (action.type) {
    case CreateProductTypes.ADD_PRODUCT_VALUE:
      return { ...state, ...action.payload };
    case CreateProductTypes.RESET_DATA:
      return initialStateProduct;
    default:
      return state;
  }
};
