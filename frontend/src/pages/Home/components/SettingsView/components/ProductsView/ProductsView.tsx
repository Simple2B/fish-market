import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CustomBtn, Spinner } from "../../../../../../components";
import {
  getBusinessProduct,
  GET_BUSINESS_PRODUCTS,
} from "../../../../../../services";
import style from "./ProductView.module.css";
import { ProductId, ShowUpdateProduct } from "./ShowUpdateProduct";

const ProductsView = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [GET_BUSINESS_PRODUCTS],
    queryFn: getBusinessProduct,
  });

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
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={style.productsViewContentWrap}>
          {data &&
            data.map(({ id }: ProductId) => (
              <ShowUpdateProduct key={id} id={id} />
            ))}
        </div>
      )}
    </div>
  );
};

export { ProductsView };
