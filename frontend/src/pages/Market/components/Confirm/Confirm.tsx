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
  marketId: string;
};

const Confirm = ({
  cartState,
  dispatchCart,
  dispatchOrder,
  onConfirm,
  submitRef,
  marketId,
}: ConfirmProps) => {
  return (
    <>
      <div className={style.confirmPage}>
        <div className={style.confirmPageTitle}>Order details</div>
        <div className={style.confirmPageContent}>
          <div className={style.contentCart}>
            <CartItems cartState={cartState} dispatchCart={dispatchCart} />
          </div>
          <div className={style.contentForm}>
            <div className={style.contentFormWrap}>
              <PersonalInfo
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
