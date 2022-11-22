export enum ItemUnit {
  kilogram = "per Kg",
  by_unit = "by Unit",
}

export type ProductItemProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  sold_by: ItemUnit;
  preps: ProductPrep[];
  onClick: (id: number) => void;
};

export type ProductPrep = { id: number; name: string };
