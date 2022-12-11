import { useState, useReducer, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";

import { ProductList } from "./components/ProductList";
import {
  initialStateCart,
  cartReducer,
  orderReducer,
  initialStateOrder,
} from "./Market.reducer";

import style from "./Market.module.css";
import { Logo } from "./components/Logo";
import { Confirm, ConfirmCode } from "./components/Confirm";

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

  const [cartState, dispatchCart] = useReducer(cartReducer, initialStateCart);
  const [orderState, dispatchOrder] = useReducer(
    orderReducer,
    initialStateOrder
  );

  const [step, setStep] = useState<BusinessStep>(BusinessStep.START_ORDER);

  const customerConfirmRef = useRef<HTMLButtonElement>(null);
  const handleStepBusiness = () => {
    if (step === BusinessStep.ORDER && cartState.length < 1) return;

    if (step === BusinessStep.CONFIRM && cartState.length < 1) {
      setStep((value) => value - 1);
    } else {
      setStep((value) => value + 1);
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
            onConfirm={handleStepBusiness}
            submitRef={customerConfirmRef}
            dispatchOrder={dispatchOrder}
          />
          <div
            className={style.businessBtn}
            onClick={() =>
              cartState.length < 1
                ? handleStepBusiness()
                : customerConfirmRef.current?.click()
            }
          >
            {buttonTitle[step]}
          </div>
        </>
      )}
      {step === BusinessStep.CONFIRM_CODE && (
        <ConfirmCode
          dispatchOrder={dispatchOrder}
          orderState={orderState}
          onConfirm={handleStepBusiness}
        />
      )}
    </>
  );
}
