import { useState, useEffect } from "react";
import { ItemUnit } from "../ProductList/ProductList.type";
import style from "./ProductType.module.css";
import { UnitOption } from "./UnitOption";

type PrepProductType = {
  soldBy: keyof typeof ItemUnit;
  amount?: number;
  setAmount: (n?: number) => void;
  selectType: ItemUnit;
  setSelectType: (n: ItemUnit) => void;
};

export function ProductType({
  soldBy,
  amount,
  setAmount,
  selectType,
  setSelectType,
}: PrepProductType) {
  const handleSelect = (option: ItemUnit | string) => {
    if (option === "by_both") {
      return;
    }
    setSelectType(option as ItemUnit);
    if (option === "Unit") {
      if (amount) {
        setAmount(Math.round(amount));
      }
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const numVAlue = Number(value);

    if (isNaN(numVAlue)) {
      console.log("not a number");
      return;
    }
    if (numVAlue <= 0) {
      setAmount(undefined);
      return;
    }

    setAmount(selectType === "Unit" ? Math.round(numVAlue) : numVAlue);
  };

  return (
    <>
      {ItemUnit.by_both !== soldBy ? (
        <UnitOption value={ItemUnit[soldBy]} itemUnit={ItemUnit[soldBy]} />
      ) : (
        <div className={style.itemsWrap}>
          <UnitOption
            onClick={handleSelect}
            value={ItemUnit.by_unit}
            itemUnit={selectType}
          />
          <UnitOption
            onClick={handleSelect}
            value={ItemUnit.kilogram}
            itemUnit={selectType}
          />
        </div>
      )}
      <div className={style.blockQty}>
        <input
          type="number"
          className={style.inputQty}
          step={selectType !== ItemUnit.kilogram ? 1 : 0.1}
          value={amount}
          onChange={handleInputChange}
          placeholder="0"
        />
        <div className={style.textQty}>{selectType}</div>
      </div>
    </>
  );
}
