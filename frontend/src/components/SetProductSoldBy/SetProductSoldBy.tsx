import classNames from "classnames";
import { settingsViewKey, SETTINGS_VIEW_TEXT_DATA } from "../../constants";
import { ItemUnit } from "../../main.type";
import style from "./SetProductSoldBy.module.css";

type SetProductSoldByProps = {
  handlerSoldBy: (type: ItemUnit) => void;
  soldByStatus: ItemUnit;
};

const textDataSoldBy = SETTINGS_VIEW_TEXT_DATA;

const SetProductSoldBy = ({
  handlerSoldBy,
  soldByStatus,
}: SetProductSoldByProps) => {
  const setStatusSoldBy = (status: ItemUnit) => {
    let setStatus = soldByStatus;

    // if you know a better way to write this function let me know

    if (status === ItemUnit.by_kilogram) {
      switch (setStatus) {
        case ItemUnit.unknown:
          setStatus = status;
          break;
        case ItemUnit.by_unit:
          setStatus = ItemUnit.by_both;
          break;
        case ItemUnit.by_both:
          setStatus = ItemUnit.by_unit;
          break;
        default:
          setStatus = ItemUnit.unknown;
      }
    }

    if (status === ItemUnit.by_unit) {
      switch (setStatus) {
        case ItemUnit.unknown:
          setStatus = status;
          break;
        case ItemUnit.by_kilogram:
          setStatus = ItemUnit.by_both;
          break;
        case ItemUnit.by_both:
          setStatus = ItemUnit.by_kilogram;
          break;
        default:
          setStatus = ItemUnit.unknown;
      }
    }

    handlerSoldBy(setStatus);
  };

  const contentBtnByKg = classNames(style.contentBnt, {
    [style.contentBntActive]:
      soldByStatus === ItemUnit.by_both ||
      soldByStatus === ItemUnit.by_kilogram,
  });

  const contentBtnByUnit = classNames(style.contentBnt, {
    [style.contentBntActive]:
      soldByStatus === ItemUnit.by_both || soldByStatus === ItemUnit.by_unit,
  });

  return (
    <div className={style.setProductSoldByContent}>
      <div>{textDataSoldBy[settingsViewKey.SOLD_BY_TEXT]}</div>
      <div
        className={contentBtnByKg}
        onClick={() => setStatusSoldBy(ItemUnit.by_kilogram)}
      >
        {textDataSoldBy[settingsViewKey.SOLD_BY_KG]}
      </div>
      <div
        className={contentBtnByUnit}
        onClick={() => setStatusSoldBy(ItemUnit.by_unit)}
      >
        {textDataSoldBy[settingsViewKey.SOLD_BY_UNIT]}
      </div>
    </div>
  );
};

export { SetProductSoldBy };
