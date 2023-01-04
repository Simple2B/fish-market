import { CreateProductType, ImageType, TypeProductsOut } from "./../main.type";
import { API_BASE_URL, TOKEN_KEY } from "../constants";
import { IUserBusinessInfo } from "../main.type";
import { setRequestHeaders } from "../utils";

export const getUserBusinessInfo = async (): Promise<IUserBusinessInfo> => {
  const res = await fetch(`${API_BASE_URL}/business/`, {
    method: "GET",
    headers: setRequestHeaders(TOKEN_KEY),
  });

  if (!res.ok) {
    localStorage.removeItem(TOKEN_KEY);
    console.error("Bad login");
    throw new Error("Business not found");
  }

  const data: IUserBusinessInfo = await res.json();

  return data;
};

export const changePasswordRequest = async (data: {
  password: string;
  new_password: string;
}): Promise<{ ok: boolean }> => {
  const res = await fetch(`${API_BASE_URL}/change-password`, {
    method: "PATCH",
    headers: setRequestHeaders(TOKEN_KEY),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Bad login");
    throw new Error("Can't change password");
  }

  const resData = await res.json();

  return resData;
};

export const updateBusinessInfo = async (data: {
  name?: string;
  user_email?: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/business/`, {
    method: "PATCH",
    headers: setRequestHeaders(TOKEN_KEY),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Bad login");
    throw new Error("Can't change business data");
  }

  const resData = await res.json();

  return resData;
};

export type uploadImageDatatype = {
  business_id: number;
  imageType: ImageType;
  file: File;
};

export const uploadImage = async ({
  business_id,
  imageType,
  file,
}: uploadImageDatatype) => {
  const formData = new FormData();
  formData.append("img_file", file);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  };

  const res = await fetch(
    `${API_BASE_URL}/business/img/${business_id}/${imageType}`,
    {
      method: "POST",
      headers: headers,
      body: formData,
    }
  );

  if (!res.ok) {
    console.error("Bad login");
    console.error("Can't change business logo");
    return;
  }

  const resData = await res.json();

  return resData;
};

export const createProduct = async (data: CreateProductType) => {
  const res = await fetch(`${API_BASE_URL}/product/`, {
    method: "POST",
    headers: setRequestHeaders(TOKEN_KEY),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Can't create product");
    throw new Error("Can't create product");
  }

  const resData = await res.json();

  return resData;
};

export const getBusinessProduct = async () => {
  const res = await fetch(`${API_BASE_URL}/product/`, {
    method: "GET",
    headers: setRequestHeaders(TOKEN_KEY),
  });

  if (!res.ok) {
    console.error("Can't get business product");
    return [];
  }

  const resData = await res.json();

  return resData.products.sort(
    (pA: { id: number }, pB: { id: number }) => pB.id - pA.id
  );
};

export const getBusinessProductById = async (id: number) => {
  const res = await fetch(`${API_BASE_URL}/product/${id}`, {
    method: "GET",
    headers: setRequestHeaders(TOKEN_KEY),
  });

  if (!res.ok) {
    console.error("Can't get business product by id");
    return undefined;
  }

  const resData = await res.json();

  return resData;
};

export const updateBusinessProductById = async (data: {
  product_id: number;
  body: Partial<Omit<TypeProductsOut, "is_out_of_stock">>;
}) => {
  // console.log(data.body, "body");

  const res = await fetch(`${API_BASE_URL}/product/${data.product_id}`, {
    method: "PATCH",
    headers: setRequestHeaders(TOKEN_KEY),
    body: JSON.stringify(data.body),
  });

  if (!res.ok) {
    console.log(
      `Can't update product_id: ${data.product_id} body:${data.body}`
    );
    return;
  }
};
