import { API_BASE_URL } from "../constants";
import { CreateOrderItems } from "../pages/Market/Market.type";

export const createCheckPhoneNumber = async (dataForm: {
  phone_number: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/phone-number/`, {
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

export const replaceDash = (dataString: string): string => {
  const newString = dataString.trim().replace(/[^0-9]/g, "");
  return newString;
};

export const phoneNumberAutoFormat = (phoneNumber: string): string => {
  const number = replaceDash(phoneNumber);

  if (number.length <= 5) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
  if (number.length <= 6) return number.replace(/(\d{3})(\d{3})/, "$1-$2");
  if (number.length <= 8)
    return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
  if (number.length <= 9)
    return number.replace(/(\d{3})(\d{3})(\d{2})(\d{1})/, "$1-$2-$3-$4");

  if (number.length < 11)
    return number.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1-$2-$3-$4");
  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};
