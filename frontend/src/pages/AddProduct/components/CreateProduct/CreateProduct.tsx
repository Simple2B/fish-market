import { SetProductInfo } from "../SetProductInfo";
import style from "./CreateProduct.module.css";

type CreateProductProps = {};

const CreateProduct = ({}: CreateProductProps) => {
  return (
    <div className={style.productViewContent}>
      <SetProductInfo />
    </div>
  );
};

export { CreateProduct };
