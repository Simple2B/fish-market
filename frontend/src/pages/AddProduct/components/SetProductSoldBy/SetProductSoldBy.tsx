import classNames from "classnames";
import {
  settingsViewKey,
  SETTINGS_VIEW_TEXT_DATA,
} from "../../../../constants";
import { CreateProductType, ItemUnit } from "../../../../main.type";
import {
  CreateProductAction,
  CreateProductActionKeys,
} from "../../AddProduct.type";
import style from "./SetProductSoldBy.module.css";

type SetProductSoldByProps = {
  productDispatch: (action: CreateProductAction) => void;
  productState: CreateProductType;
};

const textDataSoldBy = SETTINGS_VIEW_TEXT_DATA[settingsViewKey.SOLD_BY_TEXT];

const SetProductSoldBy = ({
  productDispatch,
  productState,
}: SetProductSoldByProps) => {
  const setStatusSoldBy = (type: ItemUnit) => {
    let setStatus = productState.sold_by;

    // if you know a better way to write this function let me know

    if (type === ItemUnit.by_kilogram) {
      switch (setStatus) {
        case ItemUnit.unknown:
          setStatus = type;
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

    if (type === ItemUnit.by_unit) {
      switch (setStatus) {
        case ItemUnit.unknown:
          setStatus = type;
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

    productDispatch({
      type: CreateProductActionKeys.ADD_PRODUCT_VALUE,
      payload: { sold_by: setStatus },
    });
  };

  const contentBtnByKg = classNames(style.contentBnt, {
    [style.contentBntActive]:
      productState.sold_by === ItemUnit.by_both ||
      productState.sold_by === ItemUnit.by_kilogram,
  });

  const contentBtnByUnit = classNames(style.contentBnt, {
    [style.contentBntActive]:
      productState.sold_by === ItemUnit.by_both ||
      productState.sold_by === ItemUnit.by_unit,
  });

  return (
    <div className={style.setProductSoldByContent}>
      <div>{textDataSoldBy}</div>
      <div
        className={contentBtnByKg}
        onClick={() => setStatusSoldBy(ItemUnit.by_kilogram)}
      >
        {ItemUnit.by_kilogram}
      </div>
      <div
        className={contentBtnByUnit}
        onClick={() => setStatusSoldBy(ItemUnit.by_unit)}
      >
        {ItemUnit.by_unit}
      </div>
    </div>
  );
};

export { SetProductSoldBy };
