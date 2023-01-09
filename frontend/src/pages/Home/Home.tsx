import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components";
import { REFETCH_INTERVAL_VALID_TOKEN } from "../../constants";
import { CHECK_TOKEN_LOGIN, isTokenValid } from "../../services";
import { Manager } from "./components/Manager";

export function Home() {
  const navigator = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [CHECK_TOKEN_LOGIN],
    queryFn: isTokenValid,
    onError: () => {
      navigator("/login");
    },
    refetchInterval: REFETCH_INTERVAL_VALID_TOKEN,
  });

  return isLoading ? <Spinner /> : <>{data && <Manager />}</>;
}
