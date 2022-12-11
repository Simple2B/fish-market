import React from "react";
import { IOrder, ISetOrderNumberIsVerified } from "../../Market.type";
import style from "./ConfirmCode.module.css";
import { ConfirmCodeForm } from "./ConfirmCodeForm";

type ConfirmCodeProps = {
  dispatchOrder: (action: ISetOrderNumberIsVerified) => void;
  orderState: IOrder;
  onConfirm: () => void;
};

const ConfirmCode = ({
  dispatchOrder,
  orderState,
  onConfirm,
}: ConfirmCodeProps) => {
  return (
    <div className={style.confirmCodePage}>
      <div className={style.titlePage}>Phone number confirmation</div>
      <div className={style.textPage}>
        We sent an SMS to your number. Please enter a confirmation code below.
      </div>
      <ConfirmCodeForm
        dispatchOrder={dispatchOrder}
        orderState={orderState}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export { ConfirmCode };
