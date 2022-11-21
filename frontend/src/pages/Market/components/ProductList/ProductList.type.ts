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
};
