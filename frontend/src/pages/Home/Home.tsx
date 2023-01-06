import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components";
import { CHECK_TOKEN_LOGIN, isTokenValid } from "../../services";
import { LoginUser } from "../LoginUser";
import { Manager } from "./components/Manager";

export function Home() {
  const navigator = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [CHECK_TOKEN_LOGIN],
    queryFn: isTokenValid,
  });

  if (!isLoading && !data) {
    navigator("/login");
  }

  return isLoading ? <Spinner /> : <>{data && <Manager />}</>;
}
