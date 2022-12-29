import { FiCopy } from "react-icons/fi";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CustomBtn } from "../../../../../../components";
import {
  ACTIVE_BTN_FILTER,
  API_BASE_URL,
  modalDataKeys,
  MODAL_TEXT_DATA,
  settingsViewBtnNameKeys,
  SETTINGS_VIEW_TEXT_DATA,
  TOKEN_KEY,
} from "../../../../../../constants";
import {
  IOpenModalData,
  IUserBusinessInfo,
  ManagerOutletContext,
} from "../../../../../../main.type";
import style from "./RightPanel.module.css";

const textData = SETTINGS_VIEW_TEXT_DATA;
const modalData = MODAL_TEXT_DATA[modalDataKeys.LOG_OUT_MODAL];

const RightPanel = ({
  web_site_id,
}: Pick<IUserBusinessInfo, "web_site_id">) => {
  const { openModal } = useOutletContext<ManagerOutletContext>();
  let navigate = useNavigate();

  const shopLink = `${API_BASE_URL}/market/${web_site_id}`;

  const handlerIcon = () => {
    navigator.clipboard.writeText(shopLink);
  };

  const logOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ACTIVE_BTN_FILTER);
    window.location.reload();
  };

  const handlerBtnLogOut = () => {
    const openModalData: IOpenModalData = {
      modalTitle: modalData.title,
      modalConfirmLabel: modalData.btnName,
      confirmCallback: logOut,
    };
    openModal(openModalData);
  };

  const handlerBtnChangePassword = () => {
    navigate("/settings/change-password");
  };

  return (
    <div className={style.rightPanelContent}>
      <div className={style.shopLinkContent}>
        <div className={style.shopLinkContentText}>{shopLink}</div>
        <div className={style.copyIcon} onClick={handlerIcon} title="Copy">
          <FiCopy className={style.copyIconContent} />
        </div>
      </div>
      <div className={style.buttonsContent}>
        <CustomBtn
          btnName={textData[settingsViewBtnNameKeys.CHANGE_PASSWORD].btnName}
          handlerOnClick={handlerBtnChangePassword}
          additionalStyles={style.btnStyle}
        />
        <CustomBtn
          btnName={textData[settingsViewBtnNameKeys.LOG_OUT].btnName}
          handlerOnClick={handlerBtnLogOut}
          additionalStyles={style.btnStyle}
        />
      </div>
    </div>
  );
};

export { RightPanel };
