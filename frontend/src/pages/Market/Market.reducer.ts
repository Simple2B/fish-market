import { IProduct, MarketActions, MarketActionTypes } from "./Market.type";

export function initialState(initialOrderItems: IProduct[]): IProduct[] {
  return [];
}

export function reducer(state: IProduct[], action: MarketActions) {
  switch (action.type) {
    case MarketActionTypes.ADD_ITEM:
      return [...state, action.payload];
    case MarketActionTypes.DELETE_ITEM:
      return [...state.filter((_, index) => index !== action.payload)];
    default:
      return state;
  }
}
