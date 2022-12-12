import React from "react";
import style from "./BusinessBtn.module.css";

type BusinessBtnProps = {
  onClick: () => void;
  textBtn: string;
};

const BusinessBtn = ({ onClick, textBtn }: BusinessBtnProps) => {
  return (
    <div className={style.businessBtn} onClick={onClick}>
      {textBtn}
    </div>
  );
};

export { BusinessBtn };
