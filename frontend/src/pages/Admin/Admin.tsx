import { useQuery } from "@tanstack/react-query";
import style from "./Admin.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { CHECK_TOKEN_LOGIN_A, isTokenValid } from "../../services";
import { Users } from "./components";
import { useModal } from "../../hooks";
import { CustomModal, Spinner } from "../../components";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { REFETCH_INTERVAL_VALID_TOKEN } from "../../constants";

const Admin = () => {
  const navigate = useNavigate();

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

  const { isLoading } = useQuery({
    queryKey: [CHECK_TOKEN_LOGIN_A, true],
    queryFn: isTokenValid,
    onError: () => {
      navigate("/login");
    },
    refetchInterval: REFETCH_INTERVAL_VALID_TOKEN,
  });

  const handlerRegisterNewUser = () => {
    if (isOpenRegisterNewUser) {
      navigate("/admin");
      setIsOpenRegisterNewUser(false);
    } else {
      navigate("/admin/register-new-user");
      setIsOpenRegisterNewUser(true);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

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
