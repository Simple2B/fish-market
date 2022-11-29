interface IProduct {
  id: number;
  qty: number;
}

interface ICostumer {
  fullName: string;
  phoneNumber: string;
  note?: string;
}

enum MarketActionTypes {
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
}

interface AddItemAction {
  type: MarketActionTypes.ADD_ITEM;
  payload: IProduct;
}

interface DeleteItemAction {
  type: MarketActionTypes.DELETE_ITEM;
  payload: number;
}

type MarketActions = AddItemAction | DeleteItemAction;

export function initialState(initialOrderItems: IProduct[]) {
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
