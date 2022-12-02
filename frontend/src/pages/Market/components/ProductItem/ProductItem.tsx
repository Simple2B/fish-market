import { useState, useEffect } from "react";

import { IoIosAdd } from "react-icons/io";

import { ProductType } from "./ProductType";
import style from "./ProductItem.module.css";
import { ProductItemProps, ItemUnit } from "../ProductList/ProductList.type";
import { MarketActions, MarketActionTypes } from "../../Market.type";

export function ProductItem({
  id,
  name,
  image,
  sold_by,
  price,
  preps,
  onClick,
  dispatchCart,
}: ProductItemProps) {
  const [selectType, setSelectType] = useState<ItemUnit>(
    ItemUnit.by_both === sold_by ? ItemUnit.kilogram : ItemUnit[sold_by]
  );
  const [selectedPrepId, setSelectedPrepId] = useState<number | undefined>(
    undefined
  );
  const [amount, setAmount] = useState<number>(0);
  const isBtnEnable = amount > 0 && selectedPrepId !== undefined;

  const handleAddItem = () => {
    if (isBtnEnable) {
      console.log("added item to cart");

      dispatchCart({
        type: MarketActionTypes.ADD_ITEM,
        payload: {
          itemPrice: price,
          itemType: selectType,
          itemName: name,
          itemImage: image,
          prepName: preps.find((p) => p.id === selectedPrepId)!.name,
          prepId: selectedPrepId,
          qty: amount,
        },
      });
    }
  };

  const handelSelectPrep = (value: number) => {
    if (!!value) {
      setSelectedPrepId(value);
    }
  };

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
          <ProductType
            soldBy={sold_by}
            amount={amount}
            setAmount={setAmount}
            selectType={selectType}
            setSelectType={setSelectType}
          />
        </div>

        <div className={style.preparationBlock}>
          <div className={style.preparationTitle}>Preparation method</div>
          <select
            className={style.preparationSelect}
            placeholder="Choose prep"
            defaultValue={selectedPrepId}
            onChange={(e) => handelSelectPrep(Number(e.target.value))}
          >
            <option className={style.preparationOption} disabled selected>
              please choose...
            </option>
            {preps.map(({ id, name }) => {
              return (
                <option className={style.preparationOption} key={id} value={id}>
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
