import { useQuery } from "@tanstack/react-query";
import style from "./Admin.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { CHECK_TOKEN_LOGIN_A, isTokenValid } from "../../services";
import { Users } from "./components";
import { useModal } from "../../hooks";
import { CustomModal } from "../../components";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const Admin = () => {
  const navigator = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [CHECK_TOKEN_LOGIN_A, true],
    queryFn: isTokenValid,
  });

  if (!isLoading && !data) {
    navigator("/login");
  }

  const [isOpenRegisterNewUser, setIsOpenRegisterNewUser] =
    useState<boolean>(false);

  const [
    isModalOpen,
    modalTitle,
    modalConfirmLabel,
    onConfirm,
    cleanModalState,
    openModal,
  ] = useModal();

  const handlerRegisterNewUser = () => {
    if (isOpenRegisterNewUser) {
      navigator("/admin");
      setIsOpenRegisterNewUser(false);
    } else {
      navigator("/admin/register-new-user");
      setIsOpenRegisterNewUser(true);
    }
  };

  return isOpenRegisterNewUser ? (
    <Outlet context={{ handlerRegisterNewUser }} />
  ) : (
    <div className={style.adminPageContent}>
      <div className={style.contentTitle}>User List</div>
      <Users
        openModal={openModal}
        handlerRegisterNewUser={handlerRegisterNewUser}
      />

      <CustomModal
        isOpen={isModalOpen}
        title={modalTitle}
        confirmLabel={modalConfirmLabel}
        onConfirm={onConfirm}
        onCancel={cleanModalState}
      />
      <ToastContainer />
    </div>
  );
};

export { Admin };
