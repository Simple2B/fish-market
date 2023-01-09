import { useNavigate } from "react-router-dom";
import { CustomBtn } from "../../../../../../components";
import style from "./ProductView.module.css";

type Props = {};

const ProductsView = (props: Props) => {
  const navigate = useNavigate();
  const handlerAddProduct = () => {
    navigate("/settings/add-product");
  };

  return (
    <div className={style.productsViewContent}>
      <div className={style.productsViewContentBtn}>
        <div>Item list</div>
        <CustomBtn
          btnName="Add Item"
          additionalStyles={style.activeBtn}
          handlerOnClick={handlerAddProduct}
        />
      </div>
      <div>products</div>
    </div>
  );
};

export { ProductsView };
