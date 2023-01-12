import classNames from "classnames";
import { PHONE_WIDTH } from "../../../../constants";
import { useWindowDimensions } from "../../../../hooks/useWindowDimensions";
import { IProduct } from "../../Market.type";
import style from "./BusinessBtn.module.css";

type BusinessBtnProps = {
  onClick: () => void;
  textBtn: string;
  isNotActivePhoneView: boolean;
};

const BusinessBtn = ({
  onClick,
  textBtn,
  isNotActivePhoneView,
}: BusinessBtnProps) => {
  const styleBusinessBtn = classNames(style.businessBtn, {
    [style.businessBtnInActive]: isNotActivePhoneView,
  });

  return (
    <div className={styleBusinessBtn} onClick={onClick}>
      {textBtn}
    </div>
  );
};

export { BusinessBtn };
