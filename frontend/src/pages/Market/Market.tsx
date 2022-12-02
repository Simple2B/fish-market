import { useState, useReducer } from "react";
import { Navigate, useParams } from "react-router-dom";

import { ProductList } from "./components/ProductList";
import { initialState, reducer } from "./Market.reducer";

import style from "./Market.module.css";
import { Logo } from "./components/Logo";
import { Confirm } from "./components/Confirm";

enum BusinessStep {
  START_ORDER,
  ORDER,
  CONFIRM,
}

const buttonTitle = {
  [BusinessStep.ORDER]: "Order",
  [BusinessStep.START_ORDER]: "Start Order",
  [BusinessStep.CONFIRM]: "Confirm",
};

export function Market() {
  const { marketId } = useParams<"marketId">();
  if (!marketId) {
    return <Navigate to={"/"} replace={true} />;
  }

  const [cartState, dispatchCart] = useReducer(reducer, initialState);

  const [step, setStep] = useState<BusinessStep>(BusinessStep.START_ORDER);

  const handleStepBusiness = () => {
    if (step === BusinessStep.ORDER && cartState.length < 1) return;
    setStep((value) => value + 1);
  };

  return (
    <>
      {step === BusinessStep.START_ORDER && <Logo marketId={marketId} />}
      {step === BusinessStep.ORDER && (
        <ProductList
          marketId={marketId}
          cartState={cartState}
          dispatchCart={dispatchCart}
        />
      )}
      {step === BusinessStep.CONFIRM && (
        <Confirm cartState={cartState} dispatchCart={dispatchCart} />
      )}
      <div className={style.businessBtn} onClick={handleStepBusiness}>
        {buttonTitle[step]}
      </div>
    </>
  );
}
