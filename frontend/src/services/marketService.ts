export const createCheckPhoneNumber = async (dataForm: {
  phone_number: string;
}) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/phone-number`, {
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
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/phone-number/validate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    }
  );
  if (!res.ok) {
    throw new Error("THE VERIFICATION CODE IS INCORRECT");
  }
  return await res.json();
};
