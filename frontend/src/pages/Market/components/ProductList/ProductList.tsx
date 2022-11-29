import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductItemProps } from "./ProductList.type";

import style from "./ProductList.module.css";
import { ProductItem } from "../ProductItem";

type Props = {
  marketId: string;
};

export function ProductList({ marketId }: Props) {
  console.log(marketId);

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
      <div className={style.productList}>
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
      </div>
    </>
  );
}
