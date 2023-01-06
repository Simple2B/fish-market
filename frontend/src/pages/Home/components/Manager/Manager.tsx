import { useRef, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CustomModal } from "../../../../components";
import {
  ACTIVE_BTN_FILTER,
  filterBtnNameKeys,
  FILTER_BUTTONS,
} from "../../../../constants";
import { useModal } from "../../../../hooks";

import { contentManager } from "../../../../router";
import { MenuButton } from "../MenuButton";

import style from "./Manager.module.css";

const Manager = () => {
  const pathname = useLocation().pathname;

  if (pathname === "/") {
    return <Navigate to={"/orders"} replace={true} />;
  }

  const [
    isModalOpen,
    modalTitle,
    modalConfirmLabel,
    onConfirm,
    cleanModalState,
    openModal,
  ] = useModal();

  return (
    <div className={style.managerPage}>
      <ToastContainer />
      <div className={style.navBar}>
        {contentManager.map((obj, idex) => {
          return <MenuButton key={idex} btnName={obj.nameBtn} />;
        })}
      </div>
      <Outlet context={{ openModal }} />
      <CustomModal
        isOpen={isModalOpen}
        title={modalTitle}
        confirmLabel={modalConfirmLabel}
        onConfirm={onConfirm}
        onCancel={cleanModalState}
      />
    </div>
  );
};

export { Manager };
