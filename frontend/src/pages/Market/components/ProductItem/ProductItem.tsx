import { useState, useEffect } from "react";

import { IoIosAdd } from "react-icons/io";

import { ProductType } from "./ProductType";
import style from "./ProductItem.module.css";
import { ProductItemProps, ItemUnit } from "../ProductList/ProductList.type";

type PrepOption = {
  value: number;
  label: string;
};

export function ProductItem({
  id,
  name,
  image,
  sold_by,
  price,
  preps,
  onClick,
}: ProductItemProps) {
  const [selectedPrepId, setSelectedPrepId] = useState<number | undefined>(
    undefined
  );
  const [amount, setAmount] = useState<number>(0);

  const [isBtnEnable, setIsBtnEnable] = useState<boolean>(false);

  const handleAddItem = (e: any) => {
    console.log(e.target);

    // onClick(id);
  };

  const handelSelectPrep = (value: number) => {
    if (!!value) {
      setSelectedPrepId(value);
    }
  };

  useEffect(() => {
    console.log(selectedPrepId, undefined, "check");

    if (amount > 0 && selectedPrepId !== undefined) {
      setIsBtnEnable(true);
    } else {
      setIsBtnEnable(false);
    }
    // if (amount === 0 || setSelectedPrepId !== undefined) {
    //   setIsBtnEnable(true);
    // }
  }, [amount, selectedPrepId]);

  console.log(selectedPrepId, "prep id");

  return (
    <>
      <div className={style.cardWrap}>
        <div className={style.cardBlock}>
          <div className={style.cardBlockContent}>
            <img className={style.cardImageWrap} src={image} alt={image} />
          </div>
          <div className={style.cardInfoWrap}>
            <div className={style.cardProductName}>{name}</div>
            <div
              className={style.cardProductPrice}
            >{`$${price} per ${ItemUnit.kilogram}`}</div>
          </div>
        </div>
        <div className={style.typeBlock}>
          <ProductType soldBy={sold_by} amount={amount} setAmount={setAmount} />
        </div>

        <div className={style.preparationBlock}>
          <div className={style.preparationTitle}>Preparation method</div>
          <select
            className={style.preparationSelect}
            placeholder="Choose prep"
            defaultValue={selectedPrepId}
            onChange={(e) => handelSelectPrep(Number(e.target.value))}
          >
            <option disabled selected>
              please choose...
            </option>
            {preps.map(({ id, name }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
        <div
          className={isBtnEnable ? style.addBtn : style.disabledAddBtn}
          onClick={handleAddItem}
        >
          <IoIosAdd />
        </div>
      </div>
    </>
  );
}
