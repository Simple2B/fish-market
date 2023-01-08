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
  is_deleted: boolean;
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
};

export type ManagerOutletContextAdmin = {
  handlerRegisterNewUser: () => void;
};

// this enum already exists and in future will replace in the project
export enum ItemUnit {
  by_kilogram = "by_kilogram",
  by_unit = "by_unit",
  by_both = "by_both",
  unknown = "unknown",
}

export type TypeProductsOut = {
  id: number;
  name: string;
  price: number;
  sold_by: ItemUnit;
  image: string;
  is_out_of_stock?: boolean;
};

export interface IUserBusinessInfo {
  id: number;
  name: string;
  logo: string;
  web_site_id: string;
  user_email: string;
}

export type LeftPanelType = Omit<IUserBusinessInfo, "web_site_id">;

export enum ImageType {
  logo = "logo",
  product = "product",
}

export interface IPrep {
  id: number;
  name: string;
  is_active: boolean;
}

export type CreateProductType = {
  name: string;
  price: number;
  sold_by: ItemUnit;
  image: File | string;
  preps: IPrep[];
};

export type ObjId = {
  id: number;
};

export type MarketUser = {
  id: number;
  username: string;
  orders_taken: number;
  items_sold: number;
  kg_sold: number;
  meter_sold: number;
  sms_used: number;
  is_active: boolean;
  user_type: string;
  created_at: string;
};

export type MarketUserDetail = {
  email: string;
  phone_number: string;
  address: string;
};
