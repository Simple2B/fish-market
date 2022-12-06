import classNames from "classnames";
import { ItemUnit } from "../ProductList/ProductList.type";
import style from "./ProductType.module.css";

export const UnitOption = ({
  itemUnit,
  onClick,
  value,
}: {
  itemUnit: ItemUnit;
  onClick?: () => void;
  value: ItemUnit | string;
}) => {
  const wrapperClass = classNames(style.itemWrap, {
    [style.itemWrapSelected]: value === itemUnit,
  });

  return (
    <div onClick={onClick} className={wrapperClass}>
      {value}
    </div>
  );
};
