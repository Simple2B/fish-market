import { useState } from "react";

import { LeftPanelType } from "../../../../../../main.type";
import { BusinessInfo } from "./BusinessInfo";
import { BusinessInfoUpdate } from "./BusinessInfoUpdate";
import style from "./LeftPanel.module.css";

const LeftPanel = (props: LeftPanelType) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handlerEditBtn = () => {
    setIsEdit((v) => !v);
  };

  return (
    <div className={style.leftPanelContent}>
      <div className={style.leftPanelTitle}>
        <div className={style.titleText}>Your user ID - {props.id}</div>
      </div>
      <div className={style.contentWrap}>
        {isEdit ? (
          <BusinessInfoUpdate handlerEditBtn={handlerEditBtn} {...props} />
        ) : (
          <BusinessInfo handlerEditBtn={handlerEditBtn} {...props} />
        )}
      </div>
    </div>
  );
};

export { LeftPanel };
