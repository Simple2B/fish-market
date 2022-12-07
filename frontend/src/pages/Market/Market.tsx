import { useState, useReducer, useRef } from "react";
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
  CONFIRM_CODE,
}

const buttonTitle = {
  [BusinessStep.ORDER]: "Order",
  [BusinessStep.START_ORDER]: "Start Order",
  [BusinessStep.CONFIRM]: "Confirm",
  [BusinessStep.CONFIRM_CODE]: "",
};

export function Market() {
  const { marketId } = useParams<"marketId">();
  if (!marketId) {
    return <Navigate to={"/"} replace={true} />;
  }

  const [cartState, dispatchCart] = useReducer(reducer, initialState);

  const [step, setStep] = useState<BusinessStep>(BusinessStep.START_ORDER);

  const customerConfirmRef = useRef<HTMLButtonElement>(null);
  const handleStepBusiness = () => {
    if (step === BusinessStep.ORDER && cartState.length < 1) return;
    setStep((value) => value + 1);

    console.log(buttonTitle[step]);
  };

  return (
    <>
      {step === BusinessStep.START_ORDER && (
        <>
          <Logo marketId={marketId} />
          <div className={style.businessBtn} onClick={handleStepBusiness}>
            {buttonTitle[step]}
          </div>
        </>
      )}
      {step === BusinessStep.ORDER && (
        <>
          <ProductList
            marketId={marketId}
            cartState={cartState}
            dispatchCart={dispatchCart}
          />
          <div className={style.businessBtn} onClick={handleStepBusiness}>
            {buttonTitle[step]}
          </div>
        </>
      )}
      {step === BusinessStep.CONFIRM && (
        <>
          <Confirm
            cartState={cartState}
            dispatchCart={dispatchCart}
            onConfirm={handleStepBusiness}
            submitRef={customerConfirmRef}
          />
          <div
            className={style.businessBtn}
            onClick={() => customerConfirmRef.current?.click()}
          >
            {buttonTitle[step]}
          </div>
        </>
      )}
      {step === BusinessStep.CONFIRM_CODE && <h1>Hello world</h1>}
    </>
  );
}
