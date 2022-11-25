import { useQuery } from "@tanstack/react-query";
import { ProductItemProps } from "./ProductList.type";
import { ProductItem } from "./ProductItem";
import Grid from "@mui/material/Grid";
import { AddItemModal } from "./AddItemModal";
import { useState } from "react";
import Box from "@mui/material/Box";

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
      console.log(data.products);

      return data.products;
    },
  });

  const [itemToAdd, setItemToAdd] = useState<ProductItemProps | null>(null);

  const onProductClicked = (id: number) => {
    const selectedItem = data?.find((item) => item.id === id);
    if (selectedItem) {
      setItemToAdd(selectedItem);
    }
  };

  return isLoading ? (
    <p>LOADING...</p>
  ) : (
    <>
      <Box
        sx={{
          width: "97%",
          m: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {data?.map(({ id, name, image, sold_by, price }: ProductItemProps) => (
          <ProductItem
            key={id}
            id={id}
            name={name}
            image={image}
            price={price}
            sold_by={sold_by}
            onClick={onProductClicked}
          />
        ))}
      </Box>
      <AddItemModal
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        item={itemToAdd}
      />
    </>
  );
}
