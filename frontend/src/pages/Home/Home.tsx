import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../components";
import { API_BASE_URL } from "../../constants";
import { CHECK_TOKEN, TOKEN_KEY } from "../../services";
import { LoginUser } from "./components/LoginUser";
import { Manager } from "./components/Manager";

export function Home() {
  const { data, isLoading } = useQuery({
    queryKey: [CHECK_TOKEN],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/me-info`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem(TOKEN_KEY);
        console.error("Bad login");
        return [];
      }

      const data = await res.json();

      return data.is_valid;
    },
  });

  return isLoading ? <Spinner /> : <>{data ? <Manager /> : <LoginUser />}</>;
}
