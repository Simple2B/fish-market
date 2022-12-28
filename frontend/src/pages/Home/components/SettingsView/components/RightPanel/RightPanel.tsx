import { API_BASE_URL } from "../../../../../../constants";
import { IUserBusinessInfo } from "../../../../../../main.type";
import style from "./RightPanel.module.css";

const RightPanel = ({
  web_site_id,
}: Pick<IUserBusinessInfo, "web_site_id">) => {
  return (
    <div className={style.rightPanelContent}>
      <div>{`${API_BASE_URL}/market/${web_site_id}`}</div>
      <div></div>
    </div>
  );
};

export { RightPanel };
