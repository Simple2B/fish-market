import { CreateProductType } from "../../../../main.type";
import { CreateProductAction } from "../../AddProduct.type";
import { SetProductInfo } from "../SetProductInfo";
import { SetProductSoldBy } from "../SetProductSoldBy";
import style from "./CreateProduct.module.css";

type CreateProductProps = {
  productDispatch: (action: CreateProductAction) => void;
  productState: CreateProductType;
};

const CreateProduct = ({
  productDispatch,
  productState,
}: CreateProductProps) => {
  return (
    <div className={style.productViewContent}>
      <SetProductInfo productDispatch={productDispatch} />
      <SetProductSoldBy
        productState={productState}
        productDispatch={productDispatch}
      />
    </div>
  );
};

export { CreateProduct };
