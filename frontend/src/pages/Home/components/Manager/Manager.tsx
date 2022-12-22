import { useRef, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { ManagerOutletContext } from "../../../../main.type";
import { contentManager } from "../../../../router";
import { MenuButton } from "../MenuButton";
import { CustomModal } from "../СustomModal";
import style from "./Manager.module.css";

const Manager = () => {
  const pathname = useLocation().pathname;

  if (pathname === "/") {
    return <Navigate to={"/orders"} replace={true} />;
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalConfirmLabel, setModalConfirmLabel] = useState<string>("");
  const confirmRef = useRef<() => void | null>();
  const openModal: ManagerOutletContext["openModal"] = (OpenModalData) => {
    setIsModalOpen(true);
    setModalTitle(OpenModalData.modalTitle);
    setModalConfirmLabel(OpenModalData.modalConfirmLabel);
    confirmRef.current = OpenModalData.confirmCallback;
  };

  const cleanModalState = () => {
    setIsModalOpen(false);
    setModalTitle("");
    setModalConfirmLabel("");
    confirmRef.current = undefined;
  };

  const onConfirm = () => {
    setIsModalOpen(false);
    if (!confirmRef.current) {
      return;
    }
    confirmRef.current();
    cleanModalState();
  };

  return (
    <div className={style.managerPage}>
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
