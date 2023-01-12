import { IOrder, IProduct, ISetOrderNumberIsVerified } from "../../Market.type";
import style from "./ConfirmCode.module.css";
import { ConfirmCodeForm } from "./ConfirmCodeForm";

type ConfirmCodeProps = {
  dispatchOrder: (action: ISetOrderNumberIsVerified) => void;
  onConfirm: () => void;
  orderState: IOrder;
  cartState: IProduct[];
  marketId: string;
  isPhoneView: boolean;
};

const ConfirmCode = ({
  dispatchOrder,
  orderState,
  cartState,
  onConfirm,
  marketId,
  isPhoneView,
}: ConfirmCodeProps) => {
  return (
    <div className={style.confirmCodePage}>
      <div className={style.titlePage}>
        {isPhoneView ? "Number confirmation" : "Phone number confirmation"}
      </div>
      <div className={style.textPage}>
        We sent an SMS to your number. Please enter a confirmation code below.
      </div>
      <ConfirmCodeForm
        isPhoneView={isPhoneView}
        dispatchOrder={dispatchOrder}
        orderState={orderState}
        onConfirm={onConfirm}
        cartState={cartState}
        marketId={marketId}
      />
    </div>
  );
};

export { ConfirmCode };
