import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../components";
import { API_BASE_URL, CHECK_TOKEN, TOKEN_KEY } from "../../constants";
import { LoginUser } from "./components/LoginUser";

export function Home() {
  const { data, isLoading } = useQuery({
    queryKey: [CHECK_TOKEN],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/is-authorization`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem(TOKEN_KEY);
        return false;
      }

      const data = await res.json();

      return data.is_valid;
    },
  });

  return isLoading ? <Spinner /> : <>{data ? <h1>hello</h1> : <LoginUser />}</>;
}
