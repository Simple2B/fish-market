import classNames from "classnames";
import { IProduct, ISetOrderData, IOrder } from "../../Market.type";
import { CartItems } from "../CartItems";
import { PersonalInfo } from "../PersonalInfo";

import style from "./Confirm.module.css";

type ConfirmProps = {
  setIsPersonalInfoFill: (n: boolean) => void;
  isPhoneView: boolean;
  orderState: IOrder;
  cartState: IProduct[];
  handlerDeleteCartItem: (n: number) => void;
  dispatchOrder: (action: ISetOrderData) => void;
  onConfirm: () => void;
  submitRef: React.RefObject<HTMLButtonElement>;
  marketId: string;
};

const Confirm = ({
  orderState,
  cartState,
  dispatchOrder,
  onConfirm,
  submitRef,
  marketId,
  isPhoneView,
  setIsPersonalInfoFill,
  handlerDeleteCartItem,
}: ConfirmProps) => {
  const cartItemsStyle = classNames(style.contentCart, {
    [style.disableComponent]: isPhoneView,
  });

  return (
    <>
      <div className={style.confirmPage}>
        <div className={style.confirmPageTitle}>
          {isPhoneView ? "Personal Information" : "Order details"}
        </div>
        <div className={style.confirmPageContent}>
          <div className={cartItemsStyle}>
            <CartItems
              cartState={cartState}
              handlerDeleteCartItem={handlerDeleteCartItem}
            />
          </div>
          <div className={style.contentForm}>
            <div className={style.contentFormWrap}>
              <PersonalInfo
                setIsPersonalInfoFill={setIsPersonalInfoFill}
                isPhoneView={isPhoneView}
                orderState={orderState}
                onConfirm={onConfirm}
                submitRef={submitRef}
                dispatchOrder={dispatchOrder}
                cartState={cartState}
                marketId={marketId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Confirm };
