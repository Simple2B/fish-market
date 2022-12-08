import {
  ICustomer,
  IProduct,
  ISetCustomerData,
  MarketActions,
  MarketActionTypes,
} from "./Market.type";

export const initialStateCart: IProduct[] = [];
export const initialStateCustomer: ICustomer = {
  phoneNumber: "",
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

export function customerReducer(state: ICustomer, action: ISetCustomerData) {
  switch (action.type) {
    case MarketActionTypes.SET_CUSTOMER_DATA:
      return { ...action.payload };
    default:
      return state;
  }
}
