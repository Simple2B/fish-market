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
      <div className={style.productListPage}>
        <div className={style.pageContent}>
          <div className={style.productListContent}>
            <div className={style.contentBlockTitle}>
              <div className={style.blockTitle}>Choose your items</div>
              <div className={style.blockSubTitle}>
                *The weight is roughly estimated, the order might arrive with up
                to 35% margin of difference
              </div>
            </div>
            <div className={style.blockItems}>
              {data?.map((props: Omit<ProductItemProps, "onClick">) => (
                <ProductItem
                  key={props.id}
                  onClick={onProductClicked}
                  {...props}
                />
              ))}
            </div>
          </div>
          <div className={style.productCardContent}>
            <div className={style.contentBlockTitle}>
              <div className={style.blockTitle}>Cart</div>
            </div>
            <div className={style.productCardItems}>
              {" "}
              <div className={style.productCardText}>
                Your cart is empty now. Choose items on the left to add them to
                the cart.
              </div>
            </div>
          </div>
        </div>
        <div className={style.businessBtnOrder}>Order</div>
      </div>
    </>
  );
}
