export enum OrderStatus {
  created = "created",
  pending = "pending",
  in_progress = "in_progress",
  ready = "ready",
  picked_up = "picked_up",
  can_not_complete = "can_not_complete",
}

export interface IOrder {
  prep_name: string;
  product_image: string;
  product_name: string;
  qty: number;
}

export type OrderData = {
  id: number;
  customer_name: string;
  created_at: string;
  prone_number_value: string;
  status: keyof typeof OrderStatus;
  note: string | null;
  pick_up_data: string | null;
  items: IOrder[];
};

export type CustomModalProps = {
  isOpen: boolean;
  title: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export interface IOpenModalData {
  modalTitle: string;
  modalConfirmLabel: string;
  confirmCallback: () => void;
}

export type ManagerOutletContext = {
  openModal: (OpenModalData: IOpenModalData) => void;
  activeBtnFilterName: string;
  setActiveBtnFilterName: (n: string) => void;
};
