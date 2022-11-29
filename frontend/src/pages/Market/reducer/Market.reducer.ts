interface IProduct {
  id: number;
  qty: number;
}

interface ICostumer {
  fullName: string;
  phoneNumber: string;
  note?: string;
}

interface IOrder {
  costumer: ICostumer;
  items: IProduct[];
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

export function initialState(order: IOrder) {
  return { costumer: { fullName: "", phoneNumber: "", note: "" }, items: [] };
}

export function reducer(state: IOrder, action: MarketActions) {
  switch (action.type) {
    case MarketActionTypes.ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case MarketActionTypes.DELETE_ITEM:
      return {
        ...state,
        items: [...state.items.filter(({ id }) => id !== action.payload)],
      };
    default:
      return state;
  }
}
