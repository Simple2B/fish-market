import classNames from "classnames";
import style from "./CustomBtn.module.css";

type CustomBtnProps = {
  btnName: string;
  additionalStyles?: string;
  handlerOnClick: () => void;
};

const CustomBtn = ({
  btnName,
  handlerOnClick,
  additionalStyles,
}: CustomBtnProps) => {
  const customBtnStyle = classNames(style.btnStyle, additionalStyles);

  return (
    <button className={customBtnStyle} onClick={handlerOnClick}>
      {btnName}
    </button>
  );
};

export { CustomBtn };
