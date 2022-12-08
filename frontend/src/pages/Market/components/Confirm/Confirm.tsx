import { IProduct, DeleteItemAction, ISetOrderData } from "../../Market.type";
import { CartItems } from "../CartItems";
import { PersonalInfo } from "../PersonalInfo";

import style from "./Confirm.module.css";

type ConfirmProps = {
  cartState: IProduct[];
  dispatchCart: (action: DeleteItemAction) => void;
  dispatchOrder: (action: ISetOrderData) => void;
  onConfirm: () => void;
  submitRef: React.RefObject<HTMLButtonElement>;
};

const Confirm = ({
  cartState,
  dispatchCart,
  dispatchOrder,
  onConfirm,
  submitRef,
}: ConfirmProps) => {
  return (
    <>
      <div className={style.confirmPage}>
        <div className={style.confirmPageTitle}>Order details</div>
        <div className={style.confirmPageContent}>
          <div className={style.contentCart}>
            <div className={style.contentCartWrap}>
              <CartItems cartState={cartState} dispatchCart={dispatchCart} />
            </div>
          </div>
          <div className={style.contentForm}>
            <div className={style.contentFormWrap}>
              <PersonalInfo
                onConfirm={onConfirm}
                submitRef={submitRef}
                dispatchOrder={dispatchOrder}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Confirm };
