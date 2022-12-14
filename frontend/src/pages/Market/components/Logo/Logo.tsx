import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants";
import { IBusinessOut } from "../../Market.type";
import { BusinessBtn } from "../BusinessBtn/BusinessBtn";
import Spinner from "../Spinner/Spinner";

import style from "./Logo.module.css";

interface LogoProps {
  marketId: string;
  onConfirm: () => void;
  textBtn: string;
}

const Logo = ({ marketId, onConfirm, textBtn }: LogoProps) => {
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
      className={style.businessLogoImg}
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
    <Spinner />
  ) : (
    <>
      <div className={style.marketLogoStart}>
        <div className={style.businessLogo}>
          <div className={style.businessLogoWrap}>{logoElement}</div>
        </div>
        <div className={style.businessTitle}>
          <div className={style.businessTitleText}>Welcome to {data!.name}</div>
        </div>
      </div>
      <BusinessBtn onClick={onConfirm} textBtn={textBtn} />
    </>
  );
};

export { Logo };
