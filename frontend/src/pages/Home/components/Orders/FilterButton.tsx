import classNames from "classnames";
import { StatusBtnItem } from "../../../../services";

import style from "./FilterButton.module.css";

type FilterButtonProps = {
  item: StatusBtnItem;
  handlerButtonsFilters: (item: StatusBtnItem) => void;
  activeBtnFilterName: string;
};

const FilterButton = ({
  item,
  handlerButtonsFilters,
  activeBtnFilterName,
}: FilterButtonProps) => {
  const btnFilterActive = classNames(style.buttonFilter, {
    [style.buttonFilterActive]: activeBtnFilterName === item.name,
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
