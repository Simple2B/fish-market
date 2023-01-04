import {
  AddPrepForm,
  PrepsView,
  SetProductSoldBy,
} from "../../../../components";
import { CreateProductType, ItemUnit } from "../../../../main.type";
import {
  CreateProductAction,
  CreateProductActionKeys,
} from "../../AddProduct.type";
import { SetProductInfo } from "../SetProductInfo";
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

    productDispatch({
      type: CreateProductActionKeys.ADDED_PREP,
      payload: { name: data.prep },
    });
  };

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

  const handlerSoldBy = (status: ItemUnit) => {
    productDispatch({
      type: CreateProductActionKeys.ADD_PRODUCT_VALUE,
      payload: { sold_by: status },
    });
  };

  console.log(productState, "productState");

  return (
    <div className={style.productViewContent}>
      <SetProductInfo productDispatch={productDispatch} />
      <SetProductSoldBy
        soldByStatus={productState.sold_by}
        handlerSoldBy={handlerSoldBy}
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
