import style from "./BusinessInfo.module.css";
import { LeftPanelType } from "../../../../../../main.type";
import { AiTwotoneEdit } from "react-icons/ai";
import {
  settingsViewKey,
  SETTINGS_VIEW_TEXT_DATA,
} from "../../../../../../constants";

const textData = SETTINGS_VIEW_TEXT_DATA;

const BusinessInfo = ({
  logo,
  name,
  user_email,
  handlerEditBtn,
}: LeftPanelType & { handlerEditBtn: () => void }) => {
  return (
    <div className={style.businessInfoContent}>
      <div className={style.imgContent}>
        <img className={style.imgContentWrap} src={logo} alt="logo" />
      </div>
      <div className={style.businessInfoContentWrap}>
        <div className={style.contentWrapText}>
          <span>{textData[settingsViewKey.BUSINESS_NAME]}: </span>
          {name}
        </div>
        <div className={style.contentWrapText}>
          <span> {textData[settingsViewKey.EMAIL_NAME]}: </span>
          {user_email}
        </div>
      </div>
      <div className={style.btnEdit} onClick={handlerEditBtn}>
        <AiTwotoneEdit className={style.btnEditContent} />
      </div>
    </div>
  );
};

export { BusinessInfo };
