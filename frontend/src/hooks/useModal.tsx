import { useRef, useState } from "react";
import { ManagerOutletContext } from "../main.type";

export const useModal = (): [
  boolean,
  string,
  string,
  () => void,
  () => void,
  ManagerOutletContext["openModal"]
] => {
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

  return [
    isModalOpen,
    modalTitle,
    modalConfirmLabel,
    onConfirm,
    cleanModalState,
    openModal,
  ];
};
