import React from "react";

import { FiTrash2 } from "react-icons/fi";
import { IProduct } from "../../Market.type";

import style from "./CartItem.module.css";

export const CartItem = ({
  qty,
  prepName,
  prepId,
  itemImage,
  itemName,
  itemType,
}: IProduct) => {
  return (
    <div className={style.cartContent}>
      <div className={style.cartRight}>
        <div className={style.rightWrap}>
          <img
            src={itemImage}
            alt="Product item"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className={style.leftWrap}>
          <div className={style.leftWrapTitle}>{itemName}</div>
          <div className={style.leftWrapContent}>
            <div>{prepName}</div>
            <div>
              {qty} {itemType}
            </div>
          </div>
          <div className={style.leftWrapTotal}>$ Amount</div>
        </div>
      </div>
      <div className={style.cartLeft}>
        <FiTrash2 style={{ fontSize: "30px", color: "red" }} />
      </div>
    </div>
  );
};
