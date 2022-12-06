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

  // const hiddenBtn = BusinessStep.CONFIRM === step;

  const customerConfirmRef = useRef<HTMLButtonElement>(null);
  const onConfirm = () => console.log("ON CONFIRM CALLED");
  const handleStepBusiness = () => {
    console.log({ step });

    if (step === BusinessStep.ORDER && cartState.length < 1) return;
    setStep((value) => value + 1);
    if (step === BusinessStep.CONFIRM) {
      console.log(customerConfirmRef.current);

      customerConfirmRef.current?.click();
      return;
    }
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
            onConfirm={onConfirm}
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
