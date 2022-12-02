import { useEffect, useState } from "react";
import { DeleteItemAction, IProduct } from "../../Market.type";
import { CartItem } from "./CartItem";

import style from "./CartItems.module.css";

type CartItemsProps = {
  cartState: IProduct[];
  dispatchCart: (action: DeleteItemAction) => void;
};

export const CartItems = ({ cartState, dispatchCart }: CartItemsProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (cartState) {
      const totalList = cartState.map(({ qty, itemPrice }) => qty * itemPrice);
      setTotalPrice(Math.floor(totalList.reduce((a, b) => a + b, 0)));
    }
  }, [cartState]);

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
              <div className={style.productCartTotalPrice}>$ {totalPrice}</div>
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
