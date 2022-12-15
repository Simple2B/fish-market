import { useState, useEffect } from "react";
import classNames from "classnames";

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
  dispatchCart,
}: ProductItemProps) {
  const [selectType, setSelectType] = useState<ItemUnit>(
    ItemUnit.by_both === sold_by ? ItemUnit.by_kilogram : ItemUnit[sold_by]
  );
  const [selectedPrepId, setSelectedPrepId] = useState<number>(-1);
  const [amount, setAmount] = useState<number | string>("");
  const isBtnEnable = amount && amount > 0 && selectedPrepId >= 0;

  const handleAddItem = () => {
    if (!isBtnEnable) {
      return;
    }
    dispatchCart({
      type: MarketActionTypes.ADD_ITEM,
      payload: {
        itemPrice: price,
        itemType: selectType,
        itemName: name,
        itemImage: image,
        prepName: preps.find((p) => p.id === selectedPrepId)!.name,
        prepId: selectedPrepId,
        qty: Number(amount),
      },
    });
    setAmount("");
    setSelectedPrepId(-1);
  };

  const handelSelectPrep = (value: number) => {
    if (!!value) {
      setSelectedPrepId(value);
    }
  };

  const styleBtnAdd = classNames(style.disabledAddBtn, {
    [style.availableAddBtn]: isBtnEnable,
  });

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
            >{`$${price} - ${ItemUnit.by_kilogram.toLocaleLowerCase()}`}</div>
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
            placeholder="Choose option"
            defaultValue={selectedPrepId}
            onChange={(e) => handelSelectPrep(Number(e.target.value))}
          >
            <option
              className={style.preparationOption}
              disabled
              selected={selectedPrepId === -1}
              value={-1}
            >
              Choose option...
            </option>
            {preps.map(({ id, name }) => {
              return (
                <option className={style.preparationOption} key={id} value={id}>
                  {name[0].toUpperCase() + name.slice(1)}
                  {/* temporarily */}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styleBtnAdd} onClick={handleAddItem}>
          <IoIosAdd />
        </div>
      </div>
    </>
  );
}
