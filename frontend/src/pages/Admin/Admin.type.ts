export type User = {
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

export type UserDetail = {
  email: string;
  phone_number: string;
  address: string;
};
