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

    case CreateProductActionKeys.ADDED_PREP:
      return {
        ...state,
        preps: [
          ...state.preps,
          {
            id: Date.now(), // it is like Unique ID number
            name: action.payload.name,
            is_active: false,
          },
        ],
      };

    case CreateProductActionKeys.ACTIVATE_DEACTIVATE_PREP:
      return {
        ...state,
        preps: state.preps.map((p) => {
          if (p.id === action.payload.id) {
            return { ...p, is_active: !p.is_active };
          }
          return p;
        }),
      };

    case CreateProductActionKeys.DELETE_PREP:
      return {
        ...state,
        preps: state.preps.filter((p) => p.id !== action.payload.id),
      };
    case CreateProductActionKeys.RESET_DATA:
      return initialStateProduct;
    default:
      return state;
  }
};
