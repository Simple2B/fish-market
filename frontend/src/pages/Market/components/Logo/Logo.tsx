import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { Spinner } from "../../../../components";
import { API_BASE_URL } from "../../../../constants";
import { IBusinessOut } from "../../Market.type";
import { BusinessBtn } from "../BusinessBtn/BusinessBtn";

import style from "./Logo.module.css";

interface LogoProps {
  marketId: string;
  onConfirm: () => void;
  textBtn: string;
}

const Logo = ({ marketId, onConfirm, textBtn }: LogoProps) => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["marketDetails"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/business/${marketId}`);

      if (!res.ok) {
        throw new Error("Business not found");
      }

      const data: IBusinessOut = await res.json();
      return data;
    },
    onError: () => {
      navigate("/market-not-found", { replace: true });
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
