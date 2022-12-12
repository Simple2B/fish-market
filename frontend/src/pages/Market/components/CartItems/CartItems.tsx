import { DeleteItemAction, IProduct } from "../../Market.type";
import { CartItem } from "./CartItem";

import style from "./CartItems.module.css";

type CartItemsProps = {
  cartState: IProduct[];
  dispatchCart: (action: DeleteItemAction) => void;
};

export const CartItems = ({ cartState, dispatchCart }: CartItemsProps) => {
  const totalPrice = cartState.reduce(
    (acc, currentValue) => acc + currentValue.qty * currentValue.itemPrice,
    0
  );

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
            <div className={style.productCartTotal}>
              <div className={style.productCartTotalText}>Total Price</div>
              <div className={style.productCartTotalPrice}>
                $ {Math.round(totalPrice)}
              </div>
            </div>
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
