import { PHONE_WIDTH } from "../../../../constants";
import { useWindowDimensions } from "../../../../hooks/useWindowDimensions";
import {
  IProduct,
  DeleteItemAction,
  ISetOrderData,
  IOrder,
} from "../../Market.type";
import { CartItems } from "../CartItems";
import { PersonalInfo } from "../PersonalInfo";

import style from "./Confirm.module.css";

type ConfirmProps = {
  setIsPersonalInfoFill: (n: boolean) => void;
  isPhoneView: boolean;
  orderState: IOrder;
  cartState: IProduct[];
  dispatchCart: (action: DeleteItemAction) => void;
  dispatchOrder: (action: ISetOrderData) => void;
  onConfirm: () => void;
  submitRef: React.RefObject<HTMLButtonElement>;
  marketId: string;
};

const Confirm = ({
  orderState,
  cartState,
  dispatchCart,
  dispatchOrder,
  onConfirm,
  submitRef,
  marketId,
  isPhoneView,
  setIsPersonalInfoFill,
}: ConfirmProps) => {
  return (
    <>
      <div className={style.confirmPage}>
        <div className={style.confirmPageTitle}>
          {isPhoneView ? "Personal Information" : "Order details"}
        </div>
        <div className={style.confirmPageContent}>
          <div
            style={isPhoneView ? { display: "none" } : {}}
            className={style.contentCart}
          >
            <CartItems cartState={cartState} dispatchCart={dispatchCart} />
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
