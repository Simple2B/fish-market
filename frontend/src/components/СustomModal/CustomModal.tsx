import Modal from "react-modal";
import { CustomModalProps } from "../../main.type";

import style from "./CustomModal.module.css";

const customStyles = {
  content: {
    width: "50rem",
    height: "17.125rem",
    top: "20rem",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CustomModal = ({
  isOpen,
  title,
  confirmLabel,
  onConfirm,
  onCancel,
}: CustomModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
        <div className={style.modalContent}>
          <div>{title}</div>
          <div className={style.modalContentWrap}>
            <div className={style.modalBtn} onClick={onConfirm}>
              {confirmLabel}
            </div>
            <div className={style.modalBtn} onClick={onCancel}>
              Cancel
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export { CustomModal };
