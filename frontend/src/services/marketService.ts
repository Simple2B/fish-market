import { API_BASE_URL } from "../pages/Market";
import { CreateOrderItems } from "../pages/Market/Market.type";

export const createCheckPhoneNumber = async (dataForm: {
  phone_number: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/phone-number`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });
  if (!res.ok) {
    throw new Error("FAILED TO VALIDATE PHONE NUMBER");
  }
  return await res.json();
};

export const validatePhoneNumber = async (dataForm: {
  phone_number: string;
  sms_code: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/phone-number/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });
  if (!res.ok) {
    throw new Error("THE VERIFICATION CODE IS INCORRECT");
  }
  return await res.json();
};

export const createOrder = async (data: {
  body: CreateOrderItems;
  business_uid: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/business/${data.business_uid}/order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.body),
    }
  );

  if (!res.ok) {
    throw new Error("ORDER CREATION FAILED");
  }
  return await res.json();
};
