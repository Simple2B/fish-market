export enum ItemUnit {
  kg = "kg",
  unit = "unit",
}

export type ProductItemProps = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  unit: ItemUnit;
};
