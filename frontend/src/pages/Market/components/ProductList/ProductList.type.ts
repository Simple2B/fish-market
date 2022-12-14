import { AddItemAction } from "../../Market.type";

export enum ItemUnit {
  by_kilogram = "Kg",
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
  dispatchCart: (action: AddItemAction) => void;
};

export type ProductPrep = { id: number; name: string };
