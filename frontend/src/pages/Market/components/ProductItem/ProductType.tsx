import { useState } from "react";
import { ItemUnit } from "../ProductList/ProductList.type";
import style from "./ProductType.module.css";
import { UnitOption } from "./UnitOption";

type PrepProductType = {
  soldBy: keyof typeof ItemUnit;
  amount: number;
  setAmount: (n: number) => void;
};

export function ProductType({ soldBy, amount, setAmount }: PrepProductType) {
  const [selectType, setSelectType] = useState<ItemUnit>(
    ItemUnit.by_both === soldBy ? ItemUnit.kilogram : ItemUnit[soldBy]
  );
  const handleSelectType = () => {
    if (selectType === ItemUnit.kilogram) {
      setSelectType(ItemUnit.by_unit);
    } else {
      setSelectType(ItemUnit.kilogram);
    }
  };

  const typeProduct =
    ItemUnit.by_both !== soldBy ? (
      <UnitOption value={ItemUnit[soldBy]} itemUnit={ItemUnit[soldBy]} />
    ) : (
      <div className={style.itemsWrap}>
        <UnitOption
          onClick={handleSelectType}
          value={ItemUnit.by_unit}
          itemUnit={selectType}
        />
        <UnitOption
          onClick={handleSelectType}
          value={ItemUnit.kilogram}
          itemUnit={selectType}
        />
      </div>
    );

  return (
    <>
      {typeProduct}
      <div>
        {amount} {selectType}
      </div>
    </>
  );
}
