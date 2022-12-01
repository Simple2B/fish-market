import React from "react";
import { IProduct } from "../../Market.type";

import style from "./CartItem.module.css";

export const CartItem = ({ qty, prepName, prepId }: IProduct) => {
  return (
    <div className={style.cartContent}>
      <div className={style.cartRight}>
        cart {qty}, {prepName}, {prepId}
      </div>
      <div className={style.cartLeft}> left</div>
    </div>
  );
};
