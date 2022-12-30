import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../components";
import { CHECK_TOKEN_LOGIN, isTokenValid } from "../../services";
import { LoginUser } from "./components/LoginUser";
import { Manager } from "./components/Manager";

export function Home() {
  const { data, isLoading } = useQuery({
    queryKey: [CHECK_TOKEN_LOGIN],
    queryFn: isTokenValid,
  });

  return isLoading ? <Spinner /> : <>{data ? <Manager /> : <LoginUser />}</>;
}
