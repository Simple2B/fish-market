import { useState, useReducer, useRef, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import { ProductList } from "./components/ProductList";
import {
  initialStateCart,
  cartReducer,
  orderReducer,
  initialStateOrder,
} from "./Market.reducer";

import { Logo } from "./components/Logo";
import { Confirm, ConfirmCode } from "./components/Confirm";
import { BusinessBtn } from "./components/BusinessBtn/BusinessBtn";
import { NextClient } from "./components/NextClient/NextClient";
import { MarketActionTypes } from "./Market.type";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { PHONE_WIDTH } from "./constants";

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
    return <Navigate to={"/market-not-found"} replace={true} />;
  }

  const [cartState, dispatchCart] = useReducer(cartReducer, initialStateCart);
  const [orderState, dispatchOrder] = useReducer(
    orderReducer,
    initialStateOrder
  );

  const [step, setStep] = useState<BusinessStep>(BusinessStep.START_ORDER);
  const [isCartPhoneView, setIsCartPhoneView] = useState<boolean>(false);

  const customerConfirmRef = useRef<HTMLButtonElement>(null);

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (orderState.isNumberVerified) {
        handlerStepNextClient();
      }
    }, 20000);

    return () => clearTimeout(timer);
  }, [orderState.isNumberVerified]);

  const handleStepBusiness = () => {
    if (step === BusinessStep.ORDER && cartState.length < 1) return;

    if (step === BusinessStep.CONFIRM && cartState.length < 1) {
      setStep((value) => value - 1);
    } else {
      if (step === BusinessStep.ORDER && width <= PHONE_WIDTH) {
        setIsCartPhoneView(true);
        return;
      }

      setStep((value) => value + 1);
    }
  };

  const handlerStepConfirm = () => {
    cartState.length < 1
      ? handleStepBusiness()
      : customerConfirmRef.current?.click();
  };

  const handlerStepNextClient = () => {
    const resetActionType = MarketActionTypes.RESET_DATA;
    dispatchOrder({ type: resetActionType });
    dispatchCart({ type: resetActionType });
    setStep(BusinessStep.START_ORDER);
  };

  console.log({ height, width });

  return orderState.isNumberVerified ? (
    <>
      <NextClient />
      <BusinessBtn
        onClick={handlerStepNextClient}
        textBtn="Next client"
        cartState={cartState}
      />
    </>
  ) : (
    <>
      {step === BusinessStep.START_ORDER && (
        <>
          <Logo
            marketId={marketId}
            onConfirm={handleStepBusiness}
            textBtn={buttonTitle[step]}
          />
        </>
      )}
      {step === BusinessStep.ORDER && (
        <>
          <ProductList
            marketId={marketId}
            cartState={cartState}
            dispatchCart={dispatchCart}
          />
          <BusinessBtn
            onClick={handleStepBusiness}
            textBtn={buttonTitle[step]}
            cartState={cartState}
          />
        </>
      )}
      {step === BusinessStep.CONFIRM && (
        <>
          <Confirm
            cartState={cartState}
            marketId={marketId}
            dispatchCart={dispatchCart}
            onConfirm={handleStepBusiness}
            submitRef={customerConfirmRef}
            dispatchOrder={dispatchOrder}
          />
          <BusinessBtn
            onClick={handlerStepConfirm}
            textBtn={buttonTitle[step]}
            cartState={cartState}
          />
        </>
      )}
      {step === BusinessStep.CONFIRM_CODE && (
        <ConfirmCode
          dispatchOrder={dispatchOrder}
          orderState={orderState}
          cartState={cartState}
          onConfirm={handleStepBusiness}
          marketId={marketId}
        />
      )}
    </>
  );
}
