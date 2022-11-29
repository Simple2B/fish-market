import { useState } from "react";

import Select from "react-select";

import style from "./ProductItem.module.css";
import {
  ProductItemProps,
  ItemUnit,
  ProductPrep,
} from "../ProductList/ProductList.type";

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
  const [selectedPrepId, setSelectedPrepId] = useState<number | null>(null);

  const handleAddItem = () => {
    console.log(selectedPrepId);

    onClick(id);
  };

  const handelSelectPrep = ({ value }: PrepOption) => {
    setSelectedPrepId(value);
  };

  const options = preps.map(({ id, name }: ProductPrep) => {
    return { value: id, label: name };
  });

  return (
    <div className={style.card}>
      <div className={style.cardWrap}>
        <div className={style.cardImage}>
          <img className={style.cardImageWrap} src={image} alt={image} />
        </div>
        <div>
          <div>{name}</div>
          <div>{`$${price} ${ItemUnit.kilogram}`}</div>
        </div>

        <div>
          <Select
            defaultValue={selectedPrepId}
            options={options}
            onChange={handelSelectPrep}
          />
        </div>
        <div>
          <button onClick={handleAddItem} disabled={selectedPrepId === null}>
            add item
          </button>
        </div>
      </div>
    </div>
  );
}
