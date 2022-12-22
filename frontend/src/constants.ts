export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const ENGLISH = "En";

export const modalData = {
  CAN_NOT_COMPLETED: "canNotCompletedKey",
  REMOVE_ORDER: "removeOrderKey",
};

export const TEXT_DATA = {
  ENGLISH: {
    [modalData.CAN_NOT_COMPLETED]: {
      title: "Are you sure you can’t complete *order number*?",
      btnName: "Can’t complete",
      toastMessage: "*order number* was successfully canceled",
    },
    [modalData.REMOVE_ORDER]: {
      title: "Are you sure you want to remove *order number*?",
      btnName: "Remove order",
      toastMessage: "*order number* was successfully removed",
    },
  },
};
