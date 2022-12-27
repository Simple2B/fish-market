import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { useOutletContext } from "react-router-dom";
import { modalDataKeys, MODAL_TEXT_DATA } from "../../../../constants";
import { IOpenModalData, ManagerOutletContext } from "../../../../main.type";

import { queryClient } from "../../../../queryClient";
import { GET_USER_PRODUCTS, resetOutOfStock } from "../../../../services";
import style from "./Product.module.css";

const textDataResetBtn = MODAL_TEXT_DATA[modalDataKeys.REPLENISH_ALL];

const ResetBtn = () => {
  const { openModal } = useOutletContext<ManagerOutletContext>();

  const mutateResetOutOfStock = useMutation({
    mutationFn: resetOutOfStock,
    onSuccess: async () => {
      queryClient.invalidateQueries([GET_USER_PRODUCTS]);
    },
    onError: async (err) => {
      console.log(err, "mutateResetOutOfStock");
    },
  });

  const handlerResetBtn = () => {
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
    style.boldText
  );

  return (
    <div className={resetButtonStyle} onClick={handlerResetBtn}>
      {textDataResetBtn.btnName}
    </div>
  );
};

export { ResetBtn };
