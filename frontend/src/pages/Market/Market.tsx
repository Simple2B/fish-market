import { useQuery } from "@tanstack/react-query";
import { useState, useReducer } from "react";
import { Navigate, useParams } from "react-router-dom";

import { ProductList } from "./components/ProductList";
import { initialState, reducer } from "./Market.reducer";
import { IBusinessOut, MarketActionTypes } from "./Market.type";

import style from "./Market.module.css";

export function Market() {
  const { marketId } = useParams<"marketId">();
  if (!marketId) {
    return <Navigate to={"/"} replace={true} />;
  }

  const [cartState, dispatchCart] = useReducer(reducer, initialState);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["marketDetails"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/business/${marketId}`
      );

      if (!res.ok) {
        throw new Error("Business not found");
      }

      const data: IBusinessOut = await res.json();
      return data;
    },
  });

  const [showProducts, setShowProducts] = useState<boolean>(false);
  const handleStartOrder = () => {
    setShowProducts(true);
  };

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
    <>
      {!showProducts && (
        <div className={style.marketPageStart}>
          <div className={style.businessLogo}>
            <div className={style.businessLogoWrap}>{logoElement}</div>
          </div>
          <div className={style.businessTitle}>
            <div className={style.businessTitleText}>
              Welcome to {data!.name}
            </div>
          </div>
          <div className={style.businessBtnStart} onClick={handleStartOrder}>
            <div className={style.businessBtnStartText}>Start Order</div>
          </div>
        </div>
      )}
      {showProducts && (
        <>
          <ProductList
            marketId={marketId}
            cartState={cartState}
            dispatchCart={dispatchCart}
          />
        </>
      )}
    </>
  );
}
