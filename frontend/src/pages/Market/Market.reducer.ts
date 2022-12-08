import {
  IOrder,
  IProduct,
  OrderActions,
  MarketActions,
  MarketActionTypes,
} from "./Market.type";

export const initialStateCart: IProduct[] = [];
export const initialStateOrder: IOrder = {
  phoneNumber: "",
  isNumberVerified: false,
  name: "",
  note: "",
};

export function cartReducer(state: IProduct[], action: MarketActions) {
  switch (action.type) {
    case MarketActionTypes.ADD_ITEM:
      return [...state, action.payload];
    case MarketActionTypes.DELETE_ITEM:
      return [...state.filter((_, index) => index !== action.payload)];
    default:
      return state;
  }
}

export function orderReducer(state: IOrder, action: OrderActions) {
  switch (action.type) {
    case MarketActionTypes.SET_ORDER_PHONE_NUMBER:
      return { ...state, ...action.payload };
    case MarketActionTypes.SET_ORDER_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
