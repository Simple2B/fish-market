export const createCheckPhoneNumber = async (dataForm: {
  phone_number: string;
}) => {
  // console.log(dataForm, "data");

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
