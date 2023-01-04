import { useMutation, useQuery } from "@tanstack/react-query";
import { AddPrepForm, SetProductSoldBy } from "../../../../../../components";
import { ItemUnit } from "../../../../../../main.type";
import { queryClient } from "../../../../../../queryClient";
import {
  deleteProductById,
  getBusinessProductById,
  GET_BUSINESS_PRODUCTS,
  GET_BUSINESS_PRODUCTS_BY_ID,
  updateBusinessProductById,
} from "../../../../../../services";
import { ContentPrep } from "./ContentPrep";
import { DeleteProductBtn } from "./DeleteProductBtn";
import { ProductInfo } from "./ProductInfo";
import style from "./ShowUpdateProduct.module.css";

export type ProductId = {
  id: number;
};

const ShowUpdateProduct = ({ id }: ProductId) => {
  const { data } = useQuery({
    queryKey: [GET_BUSINESS_PRODUCTS_BY_ID, id],
    queryFn: () => getBusinessProductById(id),
  });

  const mutationUpdateProductValues = useMutation({
    mutationFn: updateBusinessProductById,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_BUSINESS_PRODUCTS_BY_ID, id]);
    },
  });

  const mutationDeleteProduct = useMutation({
    mutationFn: deleteProductById,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_BUSINESS_PRODUCTS]);
    },
  });

  const handlerSoldByProduct = (status: ItemUnit) => {
    const reqData = { product_id: id, body: { sold_by: status } };
    mutationUpdateProductValues.mutate(reqData);
  };

  const handlerDeleteProduct = () => {
    mutationDeleteProduct.mutate(id);
  };

  return (
    <div className={style.showUpdateProductContent}>
      {data && (
        <>
          <ProductInfo {...data} />
          <SetProductSoldBy
            soldByStatus={data.sold_by}
            handlerSoldBy={handlerSoldByProduct}
          />
          <ContentPrep id={id} />
          <DeleteProductBtn handlerDeleteProduct={handlerDeleteProduct} />
        </>
      )}
    </div>
  );
};

export { ShowUpdateProduct };
