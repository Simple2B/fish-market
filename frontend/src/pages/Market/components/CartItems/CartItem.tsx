import React from "react";

import { FiTrash2 } from "react-icons/fi";
import {
  DeleteItemAction,
  IProduct,
  MarketActionTypes,
} from "../../Market.type";

import style from "./CartItem.module.css";

export const CartItem = ({
  qty,
  prepName,
  itemImage,
  itemName,
  itemType,
  itemPrice,
  dispatchCart,
  index,
}: IProduct & {
  dispatchCart: (action: DeleteItemAction) => void;
  index: number;
}) => {
  const handelDeleteCartItem = () => {
    dispatchCart({ type: MarketActionTypes.DELETE_ITEM, payload: index });
  };

  return (
    <div className={style.cartContent}>
      <div className={style.cartRight}>
        <div className={style.rightWrap}>
          <img src={itemImage} alt="Product item" className={style.itemImage} />
        </div>
        <div className={style.leftWrap}>
          <div className={style.leftWrapTitle}>{itemName}</div>
          <div className={style.leftWrapContent}>
            <div>{prepName}</div>
            <div>
              {qty} {itemType}
            </div>
          </div>
          <div className={style.leftWrapTotal}>
            $ {Math.floor(qty * itemPrice)}
          </div>
        </div>
      </div>
      <div className={style.cartLeft}>
        <FiTrash2
          style={{ fontSize: "30px", color: "red" }}
          onClick={handelDeleteCartItem}
        />
      </div>
    </div>
  );
};
