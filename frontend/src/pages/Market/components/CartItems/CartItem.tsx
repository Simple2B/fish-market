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
  index,
  handlerDeleteCartItem,
}: IProduct & {
  index: number;
  handlerDeleteCartItem: (n: number) => void;
}) => {
  const handelDeleteCartItem = () => {
    handlerDeleteCartItem(index);
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
          </div>
          <div className={style.leftWrapTotal}>
            {qty} {itemType.toLocaleLowerCase()}
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
