import { useQuery } from "@tanstack/react-query";
import style from "./Admin.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { CHECK_TOKEN_LOGIN_A, isTokenValid } from "../../services";
import { Users } from "./components";
import { useModal } from "../../hooks";
import { CustomModal } from "../../components";

const Admin = () => {
  const navigator = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [CHECK_TOKEN_LOGIN_A, true],
    queryFn: isTokenValid,
  });

  console.log({ data, isLoading }, "admin");

  if (!isLoading && !data) {
    navigator("/login");
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
    <div className={style.adminPageContent}>
      <div className={style.contentTitle}>User List</div>
      <Users openModal={openModal} />
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

export { Admin };
