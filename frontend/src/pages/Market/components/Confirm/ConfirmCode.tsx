import { IOrder, IProduct, ISetOrderNumberIsVerified } from "../../Market.type";
import style from "./ConfirmCode.module.css";
import { ConfirmCodeForm } from "./ConfirmCodeForm";

type ConfirmCodeProps = {
  dispatchOrder: (action: ISetOrderNumberIsVerified) => void;
  onConfirm: () => void;
  orderState: IOrder;
  cartState: IProduct[];
  marketId: string;
};

const ConfirmCode = ({
  dispatchOrder,
  orderState,
  cartState,
  onConfirm,
  marketId,
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
        cartState={cartState}
        marketId={marketId}
      />
    </div>
  );
};

export { ConfirmCode };
