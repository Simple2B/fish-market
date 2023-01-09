export const setRequestHeaders = (
  tokenKey: string
): { "Content-Type": string; Authorization: string } => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
  };

  return headers;
};
