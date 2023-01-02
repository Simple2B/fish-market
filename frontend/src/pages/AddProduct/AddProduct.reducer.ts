import { IProduct, ItemUnit } from "../../main.type";
import { CreateProductAction, CreateProductTypes } from "./AddProduct.type";

export const initialStateProduct: IProduct = {
  name: "",
  price: 0,
  sold_by: ItemUnit.unknown,
  image: "",
  preps: [],
};

export function createProductReducer(
  state: IProduct,
  action: CreateProductAction
) {
  switch (action.type) {
    case CreateProductTypes.ADD_PRODUCT_INFO:
      return { ...state, ...action.payload };
    case CreateProductTypes.RESET_DATA:
      return initialStateProduct;
    default:
      return state;
  }
}
