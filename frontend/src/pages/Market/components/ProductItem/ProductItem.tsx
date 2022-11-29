import style from "./ProductItem.module.css";
import { ProductItemProps, ItemUnit } from "../ProductList/ProductList.type";

export function ProductItem({
  id,
  name,
  image,
  sold_by,
  price,
  onClick,
}: Omit<ProductItemProps, "preps">) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className={style.card}>
      <div className={style.cardWrap}>
        <div className={style.cardImage}>
          <img className={style.cardImageWrap} src={image} alt={image} />
        </div>
        <div>
          <div>{name}</div>
          <div>{`$${price} ${ItemUnit.kilogram}`}</div>
        </div>
      </div>
    </div>
  );
}
