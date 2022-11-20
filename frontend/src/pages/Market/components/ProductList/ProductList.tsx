import { useQuery } from "@tanstack/react-query";
import { ItemUnit, ProductItemProps } from "./ProductList.type";
import { ProductItem } from "./ProductItem";
import Grid from "@mui/material/Grid";

type Props = {
  marketId: string;
};

export function ProductList({ marketId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [`marketProductList-${marketId}`],
    queryFn: async () => [
      {
        id: 1,
        name: "Salmon",
        price: 12,
        imageUrl: "https://picsum.photos/200/300/?blur=2",
        unit: ItemUnit.kg,
      },
      {
        id: 2,
        name: "Tuna",
        price: 10,
        imageUrl: "https://picsum.photos/200/300/?blur=1",
        unit: ItemUnit.unit,
      },
      {
        id: 3,
        name: "Catfish",
        price: 22,
        imageUrl: "https://picsum.photos/200/300/?blur=3",
        unit: ItemUnit.kg,
      },
    ],
  });
  return isLoading ? (
    <p>LOADING...</p>
  ) : (
    <Grid container spacing={2} py={2}>
      {data?.map(({ id, name, imageUrl, unit, price }: ProductItemProps) => (
        <ProductItem
          key={id}
          id={id}
          name={name}
          imageUrl={imageUrl}
          price={price}
          unit={unit}
        />
      ))}
    </Grid>
  );
}
