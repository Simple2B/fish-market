export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ACTIVE_BTN_FILTER = "activeBtnFilterKey";
export const ACTIVE_BTN_FILTER_INDEX = 1;

export const modalDataKeys = {
  CAN_NOT_COMPLETED: "canNotCompletedKey",
  REMOVE_ORDER: "removeOrderKey",
  REPLENISH_ALL: "replenishAllKey",
};

export const filterBtnNameKeys = {
  FUTURE_ORDERS: "futureOrdersKey",
  PENDING: "pendingKey",
  IN_PROGRESS: "inProgressKey",
  COMPLETED: "completedKey",
  CANCELLED: "cancelledKey",
};

export const navMenuBtnNameKeys = {
  ORDERS: "ordersKey",
  ARCHIVE: "archiveKey",
  OUT_OF_STOCK: "outOfStokeKey",
  SETTINGS: "settingsKey",
};

export const MODAL_TEXT_DATA = {
  [modalDataKeys.CAN_NOT_COMPLETED]: {
    // title: "Are you sure you can’t complete *order number*?",
    title: "Are you sure?",
    btnName: "Can’t complete",
    toastMessage: "Order canceled",
  },
  [modalDataKeys.REMOVE_ORDER]: {
    // title: "Are you sure you want to remove *order number*?",
    title: "Do you confirm deletion?",
    btnName: "Remove order",
    toastMessage: "Order was removed",
  },
  [modalDataKeys.REPLENISH_ALL]: {
    // title: "Are you sure you want to replenish all items?",
    title: "Do you confirm to replenish all items?",
    btnName: "Replenish All",
    toastMessage: "All items are successfully replenished!",
  },
};

export const NAV_MENU_BUTTONS = {
  [navMenuBtnNameKeys.ORDERS]: { name: "Orders" },
  [navMenuBtnNameKeys.ARCHIVE]: { name: "Archive" },
  [navMenuBtnNameKeys.OUT_OF_STOCK]: { name: "Out of Stock" },
  [navMenuBtnNameKeys.SETTINGS]: { name: "Settings" },
};

export const FILTER_BUTTONS = {
  [filterBtnNameKeys.PENDING]: {
    name: "Pending",
  },
  [filterBtnNameKeys.IN_PROGRESS]: { name: "In progress" },
  [filterBtnNameKeys.FUTURE_ORDERS]: { name: "Future orders" },
  [filterBtnNameKeys.COMPLETED]: { name: "Completed" },
  [filterBtnNameKeys.CANCELLED]: { name: "Cancelled" },
};
