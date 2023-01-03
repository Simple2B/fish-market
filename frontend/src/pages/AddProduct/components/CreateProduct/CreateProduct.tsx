import { CreateProductAction } from "../../AddProduct.type";
import { SetProductInfo } from "../SetProductInfo";
import style from "./CreateProduct.module.css";

type CreateProductProps = {
  productDispatch: (action: CreateProductAction) => void;
};

const CreateProduct = ({ productDispatch }: CreateProductProps) => {
  return (
    <div className={style.productViewContent}>
      <SetProductInfo productDispatch={productDispatch} />
    </div>
  );
};

export { CreateProduct };
