import style from "./BusinessInfo.module.css";
import { LeftPanelType } from "../../../../../../main.type";
import { AiTwotoneEdit } from "react-icons/ai";

const BusinessInfo = ({
  logo,
  name,
  user_email,
  handlerEditBtn,
}: LeftPanelType & { handlerEditBtn: () => void }) => {
  console.log(user_email);

  return (
    <div className={style.businessInfoContent}>
      <div className={style.imgContent}>
        <img className={style.imgContentWrap} src={logo} alt="logo" />
      </div>
      <div className={style.businessInfoContentWrap}>
        <div className={style.contentWrapText}>
          <span>Business name: </span>
          {name}
        </div>
        <div className={style.contentWrapText}>
          <span> Email: </span>
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
