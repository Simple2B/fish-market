import { useState } from "react";

import Select from "react-select";

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

  const [isBtnEnable, setIsBtnEnable] = useState<boolean>(true);

  const handleAddItem = (e: any) => {
    console.log(e.target);

    // onClick(id);
  };

  const handelSelectPrep = (value: number) => {
    if (!!value) {
      setSelectedPrepId(value);
    }
  };

  return (
    <>
      <div className={style.cardWrap}>
        <div className={style.cardImage}>
          <img className={style.cardImageWrap} src={image} alt={image} />
        </div>
        <div>
          <div>{name}</div>
          <div>{`$${price} ${ItemUnit.kilogram}`}</div>
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
          +
        </div>
      </div>
    </>
  );
}
