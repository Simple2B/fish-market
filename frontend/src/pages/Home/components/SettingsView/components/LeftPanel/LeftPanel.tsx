import { useState } from "react";

import { LeftPanelType } from "../../../../../../main.type";
import { BusinessInfo } from "./BusinessInfo";
import style from "./LeftPanel.module.css";

const LeftPanel = (props: LeftPanelType) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handlerEditBtn = () => {
    setIsEdit((v) => !v);
  };

  return (
    <div className={style.leftPanelContent}>
      <div className={style.leftPanelTitle}>
        <div className={style.titleText}>Your Information</div>
      </div>
      <div className={style.contentWrap}>
        {isEdit ? (
          <h1>hi</h1>
        ) : (
          <>
            <BusinessInfo handlerEditBtn={handlerEditBtn} {...props} />
          </>
        )}
      </div>
    </div>
  );
};

export { LeftPanel };
