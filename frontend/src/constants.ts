export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const TOKEN_KEY = "TOKEN";
export const ACTIVE_BTN_FILTER = "activeBtnFilterKey";
export const ACTIVE_BTN_FILTER_INDEX = 1;
export const IS_REMOVED_BTN_NAME = "Removed";

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

export const settingsViewKey = {
  CHANGE_PASSWORD: "changePasswordKey",
  LOG_OUT: "logOutKey",
  BUSINESS_NAME: "businessNameKey",
  EMAIL_NAME: "emailNameKey",
  UPLOAD_IMAGE: "uploadImage",
  ADD_NEW_ITEM: "addNewProductKey",
  ADD_ITEM: "addProductKey",
  ADD: "",
  CANCEL: "cancelKey",
  DELETE_ITEM: "",
  CONFIRM: "Confirm",
  TITLE_LINK: "titleLinkKey",
  NOTIFY_MES: "notifyMessageKey",
  SOLD_BY_TEXT: "soldByTextKey",
};

export const SETTINGS_VIEW_TEXT_DATA = {
  [settingsViewKey.SOLD_BY_TEXT]: "Sold by",
  [settingsViewKey.ADD_NEW_ITEM]: "Add new item",
  [settingsViewKey.CANCEL]: "Cancel",
  [settingsViewKey.ADD_ITEM]: "Add Item",
  [settingsViewKey.BUSINESS_NAME]: "Business name",
  [settingsViewKey.EMAIL_NAME]: "Email",
  [settingsViewKey.UPLOAD_IMAGE]: "upload image",
  [settingsViewKey.CHANGE_PASSWORD]: "Change password",
  [settingsViewKey.LOG_OUT]: "Log Out",
  [settingsViewKey.CONFIRM]: "Confirm",
  [settingsViewKey.TITLE_LINK]: "Link on your market",
  [settingsViewKey.NOTIFY_MES]: "The password was successfully changed!",
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
    btnName: SETTINGS_VIEW_TEXT_DATA[settingsViewKey.LOG_OUT],
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
