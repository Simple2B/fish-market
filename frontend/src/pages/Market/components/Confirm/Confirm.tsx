import { IProduct, DeleteItemAction } from "../../Market.type";
import { CartItems } from "../CartItems";
import { PersonalInfo } from "../PersonalInfo";

import style from "./Confirm.module.css";

type ConfirmProps = {
  cartState: IProduct[];
  dispatchCart: (action: DeleteItemAction) => void;
  onConfirm: () => void;
};

const Confirm = ({ cartState, dispatchCart, onConfirm }: ConfirmProps) => {
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
              <PersonalInfo onConfirm={onConfirm} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Confirm };
