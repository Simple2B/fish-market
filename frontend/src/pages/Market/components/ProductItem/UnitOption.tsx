import classNames from "classnames";
import { ItemUnit } from "../ProductList/ProductList.type";
import style from "./ProductType.module.css";

export const UnitOption = ({
  itemUnit,
  onClick,
  value,
}: {
  itemUnit: ItemUnit;
  onClick?: (value: ItemUnit | string) => void;
  value: ItemUnit | string;
}) => {
  const wrapperClass = classNames(style.itemWrap, {
    [style.itemWrapSelected]: value === itemUnit,
  });
  const handleClick = () => {
    onClick && onClick(value);
  };

  return (
    <div onClick={handleClick} className={wrapperClass}>
      {value}
    </div>
  );
};
