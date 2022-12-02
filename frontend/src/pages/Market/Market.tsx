import { useState, useReducer } from "react";
import { Navigate, useParams } from "react-router-dom";

import { ProductList } from "./components/ProductList";
import { initialState, reducer } from "./Market.reducer";

import style from "./Market.module.css";
import { Logo } from "./components/Logo";

enum IBusinessStep {
  START_ORDER,
  ORDER,
}

const buttonTitle = {
  [IBusinessStep.ORDER]: "Order",
  [IBusinessStep.START_ORDER]: "Start Order",
};

export function Market() {
  const { marketId } = useParams<"marketId">();
  if (!marketId) {
    return <Navigate to={"/"} replace={true} />;
  }

  const [cartState, dispatchCart] = useReducer(reducer, initialState);

  const [step, setStep] = useState<IBusinessStep>(IBusinessStep.START_ORDER);

  const handleStepBusiness = () => {
    if (step === IBusinessStep.ORDER && cartState.length < 1) return;
    setStep((value) => value + 1);
  };

  return (
    <>
      {step === IBusinessStep.START_ORDER && <Logo marketId={marketId} />}
      {step === IBusinessStep.ORDER && (
        <ProductList
          marketId={marketId}
          cartState={cartState}
          dispatchCart={dispatchCart}
        />
      )}
      <div className={style.businessBtn} onClick={handleStepBusiness}>
        {buttonTitle[step]}
      </div>
    </>
  );
}
