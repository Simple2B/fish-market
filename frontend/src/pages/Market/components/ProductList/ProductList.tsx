import { useQuery } from "@tanstack/react-query";
import { ProductItemProps } from "./ProductList.type";
import { ProductItem } from "./ProductItem";
import Grid from "@mui/material/Grid";

type Props = {
  marketId: string;
};

export function ProductList({ marketId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [`marketProductList-${marketId}`],
    queryFn: async () => {
      console.log(import.meta.env.VITE_API_BASE_URL);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/business/${marketId}/product`
      );
      const data: { products: ProductItemProps[] } = await res.json();
      return data.products;
    },
  });

  const onProductClicked = (id: number) => console.log({ id });

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
          onClick={onProductClicked}
        />
      ))}
    </Grid>
  );
}
