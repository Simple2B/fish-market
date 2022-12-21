import React from "react";
import { IOrder } from "./Order.type";

import style from "./OrderItem.module.css";

const OrderItem = ({ prep_name, product_image, product_name, qty }: IOrder) => {
  return (
    <div className={style.orderItemContent}>
      <div className={style.orderItemContentRow}>
        <div className={style.orderItemImage}>
          <img
            className={style.orderItemImageWrap}
            src={product_image}
            alt=""
          />
        </div>
      </div>
      <div className={style.orderItemContentRow}>
        <div>Item</div>
        <div>{product_name}</div>
      </div>
      <div className={style.orderItemContentRow}>
        <div>Amount</div>
        <div>{qty}</div>
      </div>
      <div className={style.orderItemContentRow}>
        <div>Prep</div>
        <div>{prep_name}</div>
      </div>
    </div>
  );
};

export { OrderItem };
