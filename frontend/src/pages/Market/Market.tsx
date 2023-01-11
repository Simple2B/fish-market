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
import { PHONE_WIDTH } from "../../constants";
import style from "./Market.module.css";

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
  const { height, width } = useWindowDimensions();

  const isPhoneView = width <= PHONE_WIDTH;

  const [cartState, dispatchCart] = useReducer(cartReducer, initialStateCart);
  const [orderState, dispatchOrder] = useReducer(
    orderReducer,
    initialStateOrder
  );

  const [step, setStep] = useState<BusinessStep>(BusinessStep.START_ORDER);
  const [isShowCart, setIsShowCart] = useState<boolean>(false);
  const [isPersonalInfoFill, setIsPersonalInfoFill] = useState<boolean>(false);

  const customerConfirmRef = useRef<HTMLButtonElement>(null);

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
      if (step === BusinessStep.ORDER && isPhoneView) {
        if (!isShowCart) {
          setIsShowCart(true);
        } else {
          setIsShowCart(false);
          setStep((value) => value + 1);
        }
      } else {
        setStep((value) => value + 1);
      }
    }
  };

  const handlerStepConfirm = () => {
    cartState.length < 1
      ? handleStepBusiness()
      : customerConfirmRef.current?.click();
    setIsPersonalInfoFill(false);
  };

  const handlerStepNextClient = () => {
    const resetActionType = MarketActionTypes.RESET_DATA;
    dispatchOrder({ type: resetActionType });
    dispatchCart({ type: resetActionType });
    setStep(BusinessStep.START_ORDER);
  };

  const isNotActiveBtnPhoneView = width <= PHONE_WIDTH && cartState.length <= 0;

  return orderState.isNumberVerified ? (
    <div className={style.mainContent}>
      <NextClient />
      <BusinessBtn
        onClick={handlerStepNextClient}
        textBtn="Next client"
        isNotActivePhoneView={isNotActiveBtnPhoneView}
      />
    </div>
  ) : (
    <>
      {step === BusinessStep.START_ORDER && (
        <div className={style.mainContent}>
          <Logo
            marketId={marketId}
            onConfirm={handleStepBusiness}
            textBtn={buttonTitle[step]}
          />
        </div>
      )}
      {step === BusinessStep.ORDER && (
        <div className={style.mainContent}>
          <ProductList
            isShowCart={isShowCart}
            marketId={marketId}
            cartState={cartState}
            dispatchCart={dispatchCart}
          />
          <BusinessBtn
            onClick={handleStepBusiness}
            textBtn={buttonTitle[step]}
            isNotActivePhoneView={isNotActiveBtnPhoneView}
          />
        </div>
      )}
      {step === BusinessStep.CONFIRM && (
        <div className={style.mainContent}>
          <Confirm
            setIsPersonalInfoFill={setIsPersonalInfoFill}
            isPhoneView={isPhoneView}
            orderState={orderState}
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
            isNotActivePhoneView={isPhoneView && !isPersonalInfoFill}
          />
        </div>
      )}
      {step === BusinessStep.CONFIRM_CODE && (
        <ConfirmCode
          isPhoneView={isPhoneView}
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
