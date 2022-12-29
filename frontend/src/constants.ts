export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const TOKEN_KEY = "TOKEN";
export const ACTIVE_BTN_FILTER = "activeBtnFilterKey";
export const ACTIVE_BTN_FILTER_INDEX = 1;

export const modalDataKeys = {
  CAN_NOT_COMPLETED: "canNotCompletedKey",
  REMOVE_ORDER: "removeOrderKey",
  REPLENISH_ALL: "replenishAllKey",
  LOG_OUT_MODAL: "logOutModalKey",
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

export const settingsViewBtnNameKeys = {
  CHANGE_PASSWORD: "changePasswordKey",
  LOG_OUT: "logOutKey",
  ADD_NEW_ITEM: "",
  ADD_ITEM: "",
  ADD: "",
  CANCEL: "",
  DELETE_ITEM: "",
  CONFIRM: "Confirm",
};

export const SETTINGS_VIEW_TEXT_DATA = {
  [settingsViewBtnNameKeys.CHANGE_PASSWORD]: { btnName: "Change password" },
  [settingsViewBtnNameKeys.LOG_OUT]: { btnName: "Log Out" },
  [settingsViewBtnNameKeys.CONFIRM]: { btnName: "Confirm" },
};

export const changePasswordKeys = {
  OLD_PASSWORD: "oldPasswordKey",
  NEW_PASSWORD: "newPasswordKey",
  REPEAT_NEW_PASSWORD: "repeatPasswordKey",
  PLACEHOLDER: "placeholderKey",
  NOT_REPEAT_ERR: "notRepeatErrKey",
};

export const CHANGE_PASSWORD_INPUT_DATA = {
  [changePasswordKeys.OLD_PASSWORD]: "Old password",
  [changePasswordKeys.NEW_PASSWORD]: "New Password",
  [changePasswordKeys.REPEAT_NEW_PASSWORD]: "Please repeat New Password",
  [changePasswordKeys.PLACEHOLDER]: "Type here",
  [changePasswordKeys.NOT_REPEAT_ERR]:
    "Your new password does not match your repeat password",
};

export const MODAL_TEXT_DATA = {
  [modalDataKeys.CAN_NOT_COMPLETED]: {
    title: "Are you sure?",
    btnName: "Can’t complete",
    toastMessage: "Order canceled",
  },
  [modalDataKeys.REMOVE_ORDER]: {
    title: "Do you confirm deletion?",
    btnName: "Remove order",
    toastMessage: "Order was removed",
  },
  [modalDataKeys.REPLENISH_ALL]: {
    title: "Do you confirm to replenish all items?",
    btnName: "Replenish All",
    toastMessage: "All items are successfully replenished!",
  },
  [modalDataKeys.LOG_OUT_MODAL]: {
    title: "Are you sure you want to log out?",
    btnName: SETTINGS_VIEW_TEXT_DATA[settingsViewBtnNameKeys.LOG_OUT].btnName,
    toastMessage: "",
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
