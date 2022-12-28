import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { useOutletContext } from "react-router-dom";
import { modalDataKeys, MODAL_TEXT_DATA } from "../../../../constants";
import {
  IOpenModalData,
  ManagerOutletContext,
  TypeProductsOut,
} from "../../../../main.type";

import { queryClient } from "../../../../queryClient";
import { GET_USER_PRODUCTS, resetOutOfStock } from "../../../../services";
import style from "./Product.module.css";

const textDataResetBtn = MODAL_TEXT_DATA[modalDataKeys.REPLENISH_ALL];

const ResetBtn = ({ products }: { products: TypeProductsOut[] }) => {
  const { openModal } = useOutletContext<ManagerOutletContext>();

  const IsAllOutOfStock =
    products.filter((product) => product.is_out_of_stock).length < 1;

  const mutateResetOutOfStock = useMutation({
    mutationFn: resetOutOfStock,
    onSuccess: async () => {
      queryClient.invalidateQueries([GET_USER_PRODUCTS]);
    },
    onError: async (err) => {
      console.error(err, "mutateResetOutOfStock");
    },
  });

  const handlerResetBtn = () => {
    if (IsAllOutOfStock) {
      return;
    }

    const openModalData: IOpenModalData = {
      modalTitle: textDataResetBtn.title,
      modalConfirmLabel: textDataResetBtn.btnName,
      confirmCallback: () => mutateResetOutOfStock.mutate(),
    };
    openModal(openModalData);
  };

  const resetButtonStyle = classNames(
    style.productContent,
    style.resBtn,
    style.boldText,
    { [style.isOutOfStock]: IsAllOutOfStock }
  );

  return (
    <div className={resetButtonStyle} onClick={handlerResetBtn}>
      {textDataResetBtn.btnName}
    </div>
  );
};

export { ResetBtn };
