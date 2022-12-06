import { AddItemAction } from "../../Market.type";

export enum ItemUnit {
  kilogram = "Kg",
  by_unit = "Unit",
  by_both = "by_both",
}

export type ProductItemProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  sold_by: keyof typeof ItemUnit;
  preps: ProductPrep[];
  onClick: (id: number) => void;
  dispatchCart: (action: AddItemAction) => void;
};

export type ProductPrep = { id: number; name: string };
