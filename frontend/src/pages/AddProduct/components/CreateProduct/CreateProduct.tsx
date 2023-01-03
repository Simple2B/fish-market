import { AddPrepForm } from "../../../../components";
import { CreateProductType } from "../../../../main.type";
import {
  CreateProductAction,
  CreateProductActionKeys,
} from "../../AddProduct.type";
import { PrepsView } from "../PrepsView";
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
  const handlerAddPreps = (data: { prep: string }) => {
    if (!data) return;

    console.log(data);

    productDispatch({
      type: CreateProductActionKeys.ADDED_PREP,
      payload: { name: data.prep },
    });
  };

  console.log(productState);

  const handlerOnClickPrep = (prepId: number) => {
    productDispatch({
      type: CreateProductActionKeys.ACTIVATE_DEACTIVATE_PREP,
      payload: { id: prepId },
    });
  };

  const handlerDeletePrep = (prepId: number) => {
    productDispatch({
      type: CreateProductActionKeys.DELETE_PREP,
      payload: { id: prepId },
    });
  };

  return (
    <div className={style.productViewContent}>
      <SetProductInfo productDispatch={productDispatch} />
      <SetProductSoldBy
        productState={productState}
        productDispatch={productDispatch}
      />
      <PrepsView
        preps={productState.preps}
        handlerOnClickPrep={handlerOnClickPrep}
        handlerDeletePrep={handlerDeletePrep}
      />
      <AddPrepForm handlerAddPreps={handlerAddPreps} />
    </div>
  );
};

export { CreateProduct };
