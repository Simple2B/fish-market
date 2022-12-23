import classNames from "classnames";
import { FilterBtnItem } from "../../../../services";

import style from "./FilterButton.module.css";

type FilterButtonProps = {
  item: FilterBtnItem;
  handlerButtonsFilters: (item: FilterBtnItem) => void;
  activeBtn: string;
};

const FilterButton = ({
  item,
  handlerButtonsFilters,
  activeBtn,
}: FilterButtonProps) => {
  const btnFilterActive = classNames(style.buttonFilter, {
    [style.buttonFilterActive]: activeBtn === item.name,
  });
  return (
    <div
      className={btnFilterActive}
      key={item.name}
      onClick={() => handlerButtonsFilters(item)}
    >
      {item.name}
    </div>
  );
};

export { FilterButton };
