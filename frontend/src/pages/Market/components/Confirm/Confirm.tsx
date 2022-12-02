import { IProduct, DeleteItemAction } from "../../Market.type";
import { CartItems } from "../CartItems";
import { PersonalInfo } from "../PersonalInfo";

import style from "./Confirm.module.css";

type ConfirmProps = {
  cartState: IProduct[];
  dispatchCart: (action: DeleteItemAction) => void;
};

const Confirm = ({ cartState, dispatchCart }: ConfirmProps) => {
  return (
    <div className={style.confirmPage}>
      <div className={style.confirmPageTitle}>Order details</div>
      <div className={style.confirmPageContent}>
        <div className={style.contentCart}>
          <CartItems cartState={cartState} dispatchCart={dispatchCart} />
        </div>
        <div className={style.contentForm}>
          <PersonalInfo />
        </div>
      </div>
    </div>
  );
};

export { Confirm };
