export enum ItemUnit {
  kilogram = "per Kg",
  by_unit = "by Unit",
  by_both = "buBoth",
}

export type ProductItemProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  sold_by: keyof typeof ItemUnit;
  preps: ProductPrep[];
  onClick: (id: number) => void;
};

export type ProductPrep = { id: number; name: string };
