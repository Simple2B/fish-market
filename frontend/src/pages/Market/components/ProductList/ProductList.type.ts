export enum ItemUnit {
  kg = "kg",
  unit = "unit",
}

export type ProductItemProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  unit: ItemUnit;
  preps: ProductPrep[];
  onClick: (id: number) => void;
};

export type ProductPrep = { id: number; name: string };
