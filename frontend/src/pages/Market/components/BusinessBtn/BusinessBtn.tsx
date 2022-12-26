import classNames from "classnames";
import React from "react";
import { useWindowDimensions } from "../../../../hooks/useWindowDimensions";
import { PHONE_WIDTH } from "../../constants";
import { IProduct } from "../../Market.type";
import style from "./BusinessBtn.module.css";

type BusinessBtnProps = {
  onClick: () => void;
  textBtn: string;
  cartState: IProduct[];
};

const BusinessBtn = ({ onClick, textBtn, cartState }: BusinessBtnProps) => {
  const { height, width } = useWindowDimensions();

  const styleBusinessBtn = classNames(style.businessBtn, {
    [style.businessBtnInActive]: width <= PHONE_WIDTH && cartState.length <= 0,
  });

  console.log(
    width <= PHONE_WIDTH && cartState.length,
    " width <= PHONE_WIDTH && cartState.length"
  );

  return (
    <div className={styleBusinessBtn} onClick={onClick}>
      {textBtn}
    </div>
  );
};

export { BusinessBtn };
