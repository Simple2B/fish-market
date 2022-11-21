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
    queryFn: async () => {
      const res = await fetch(
        `http://127.0.0.1:8008/business/${marketId}/product`
      );
      const data: { products: ProductItemProps[] } = await res.json();
      return data.products;
    },
  });
  return isLoading ? (
    <p>LOADING...</p>
  ) : (
    <Grid container spacing={2} py={2}>
      {data?.map(({ id, name, image, unit, price }: ProductItemProps) => (
        <ProductItem
          key={id}
          id={id}
          name={name}
          image={image}
          price={price}
          unit={unit}
        />
      ))}
    </Grid>
  );
}
