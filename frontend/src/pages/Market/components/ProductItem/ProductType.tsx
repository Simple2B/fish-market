import { useState, useEffect } from "react";
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

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const numVAlue = Number(value);
    if (isNaN(numVAlue)) {
      console.log("not a number");
      return;
    }
    if (numVAlue < 0) {
      setAmount(0);
      return;
    }
    setAmount(numVAlue);
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
      <div className={style.blockQty}>
        <input
          type="number"
          className={style.inputQty}
          value={amount}
          onChange={handleInputChange}
        />
        <div className={style.textQty}>{selectType}</div>
      </div>
    </>
  );
}
