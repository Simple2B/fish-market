import { useQuery } from "@tanstack/react-query";
import { ProductItemProps } from "./ProductList.type";

import style from "./ProductList.module.css";
import { ProductItem } from "../ProductItem";

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

  const onProductClicked = (id: number) => {
    const selectedItem = data?.find((item) => item.id === id);
    if (selectedItem) {
      console.log(id);
    }
  };

  return isLoading ? (
    <p>LOADING...</p>
  ) : (
    <>
      <div className={style.productList}>
        {data?.map((props: Omit<ProductItemProps, "onClick">) => (
          <ProductItem key={props.id} onClick={onProductClicked} {...props} />
        ))}
      </div>
    </>
  );
}
