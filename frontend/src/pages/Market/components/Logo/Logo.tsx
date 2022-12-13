import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants";
import { IBusinessOut } from "../../Market.type";

import style from "./Logo.module.css";

interface LogoProps {
  marketId: string;
}

const Logo = ({ marketId }: LogoProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["marketDetails"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/business/${marketId}`);

      if (!res.ok) {
        throw new Error("Business not found");
      }

      const data: IBusinessOut = await res.json();
      return data;
    },
  });

  const logoElement = data?.logo ? (
    <img
      style={{ width: "100%", height: "100%" }}
      src={data.logo}
      alt="Business logo"
    />
  ) : (
    "logo"
  );

  if (isError) {
    return <Navigate to={"/"} replace={true} />;
  }

  return isLoading ? (
    <p>LOADING...</p>
  ) : (
    <div className={style.marketLogoStart}>
      <div className={style.businessLogo}>
        <div className={style.businessLogoWrap}>{logoElement}</div>
      </div>
      <div className={style.businessTitle}>
        <div className={style.businessTitleText}>Welcome to {data!.name}</div>
      </div>
    </div>
  );
};

export { Logo };
