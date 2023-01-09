import { useMutation, useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { SetProductSoldBy } from "../../../../../../components";
import { modalDataKeys, MODAL_TEXT_DATA } from "../../../../../../constants";
import {
  IOpenModalData,
  ItemUnit,
  ManagerOutletContext,
} from "../../../../../../main.type";
import { queryClient } from "../../../../../../queryClient";
import {
  CHECK_TOKEN_LOGIN,
  deleteProductById,
  getBusinessProductById,
  GET_BUSINESS_PRODUCTS,
  GET_BUSINESS_PRODUCTS_BY_ID,
  notify,
  updateBusinessProductById,
} from "../../../../../../services";
import { ContentPrep } from "./ContentPrep";
import { DeleteProductBtn } from "./DeleteProductBtn";
import { ProductInfo } from "./ProductInfo";
import style from "./ShowUpdateProduct.module.css";

const textModalData = MODAL_TEXT_DATA[modalDataKeys.DELETE_PRODUCT];

export type ProductId = {
  id: number;
};

const ShowUpdateProduct = ({ id }: ProductId) => {
  const { openModal } = useOutletContext<ManagerOutletContext>();

  const { data } = useQuery({
    queryKey: [GET_BUSINESS_PRODUCTS_BY_ID, id],
    queryFn: () => getBusinessProductById(id),
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN]);
    },
  });

  const mutationUpdateProductValues = useMutation({
    mutationFn: updateBusinessProductById,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_BUSINESS_PRODUCTS_BY_ID, id]);
    },
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN]);
    },
  });

  const mutationDeleteProduct = useMutation({
    mutationFn: deleteProductById,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_BUSINESS_PRODUCTS]);
      notify(textModalData.toastMessage);
    },
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN]);
    },
  });

  const handlerSoldByProduct = (status: ItemUnit) => {
    const reqData = { product_id: id, body: { sold_by: status } };
    mutationUpdateProductValues.mutate(reqData);
  };

  const handlerDeleteProduct = () => {
    if (!data) return;
    const openModalData: IOpenModalData = {
      modalTitle: `${textModalData.title} *${data.name}*?`,
      modalConfirmLabel: textModalData.btnName,
      confirmCallback: () => mutationDeleteProduct.mutate(id),
    };
    openModal(openModalData);
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
