import { useMutation, useQuery } from "@tanstack/react-query";
import { AddPrepForm, SetProductSoldBy } from "../../../../../../components";
import { ItemUnit } from "../../../../../../main.type";
import { queryClient } from "../../../../../../queryClient";
import {
  getBusinessProductById,
  GET_BUSINESS_PRODUCTS_BY_ID,
  updateBusinessProductById,
} from "../../../../../../services";
import { ContentPrep } from "./ContentPrep";
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
      console.log("success");
    },
  });

  const handlerSoldByProduct = (status: ItemUnit) => {
    const reqData = { product_id: id, body: { sold_by: status } };
    mutationUpdateProductValues.mutate(reqData);
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
        </>
      )}
    </div>
  );
};

export { ShowUpdateProduct };
