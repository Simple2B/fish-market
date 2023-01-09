import style from "./ProductInfo.module.css";
import { TypeProductsOut } from "../../../../../../main.type";

export type ProductInfoType = Omit<TypeProductsOut, "is_out_of_stock">;

const ProductInfo = ({
  name,
  price,
  image,
}: Omit<ProductInfoType, "sold_by">) => {
  return (
    <div className={style.productInfoContent}>
      <div className={style.productInfoImage}>
        <img
          className={style.productInfoImageWrap}
          src={image}
          alt="Product logo"
        />
      </div>
      <div className={style.productInfoContentWrap}>
        <div>{name}</div>
        <div>$ {price} per kg</div>
      </div>
    </div>
  );
};

export { ProductInfo };
