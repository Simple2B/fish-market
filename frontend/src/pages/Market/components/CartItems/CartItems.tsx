import { DeleteItemAction, IProduct } from "../../Market.type";
import { CartItem } from "./CartItem";

import style from "./CartItems.module.css";

type CartItemsProps = {
  cartState: IProduct[];
  dispatchCart: (action: DeleteItemAction) => void;
};

export const CartItems = ({ cartState, dispatchCart }: CartItemsProps) => {
  return (
    <div style={{ paddingBottom: "15vh" }}>
      <div className={style.productCartItems}>
        {cartState.length > 0 ? (
          <>
            {cartState.map((prod: IProduct, index: number) => {
              return (
                <CartItem
                  key={index}
                  index={index}
                  {...prod}
                  dispatchCart={dispatchCart}
                />
              );
            })}
          </>
        ) : (
          <div className={style.productCartText}>
            Your cart is empty now. Choose items on the left to add them to the
            cart.
          </div>
        )}
      </div>
    </div>
  );
};
