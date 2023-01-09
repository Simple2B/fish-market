import { IOrder, ItemUnit } from "../../../../main.type";

import style from "./OrderItem.module.css";

const OrderItem = ({
  prep_name,
  product_image,
  product_name,
  qty,
  unit_type,
}: IOrder) => {
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
        <div>
          {qty} {unit_type === ItemUnit.by_kilogram ? "kg" : ""}
        </div>
      </div>
      <div className={style.orderItemContentRow}>
        <div>Prep</div>
        <div>{prep_name}</div>
      </div>
    </div>
  );
};

export { OrderItem };
