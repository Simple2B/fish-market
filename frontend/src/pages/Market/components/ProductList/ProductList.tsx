import { useQuery } from "@tanstack/react-query";
import { ProductItemProps } from "./ProductList.type";

import style from "./ProductList.module.css";
import { ProductItem } from "../ProductItem";
import { IProduct, MarketActions } from "../../Market.type";
import { CartItems } from "../CartItems";

type Props = {
  marketId: string;
  cartState: IProduct[];
  dispatchCart: (action: MarketActions) => void;
};

export function ProductList({ marketId, cartState, dispatchCart }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [`marketProductList-${marketId}`],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/business/${marketId}/product`
      );
      const data: { products: ProductItemProps[] } = await res.json();

      return data.products;
    },
  });

  const onProductClicked = (id: number) => {
    const selectedItem = data?.find((item) => item.id === id);
    if (selectedItem) {
      console.log(id);
    }
  };

  console.log(cartState, !cartState);
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
              {data?.map(
                (props: Omit<ProductItemProps, "onClick" | "dispatchCart">) => (
                  <ProductItem
                    key={props.id}
                    onClick={onProductClicked}
                    dispatchCart={dispatchCart}
                    {...props}
                  />
                )
              )}
            </div>
          </div>
          <div className={style.productCardContent}>
            <div className={style.contentBlockTitle}>
              <div className={style.blockTitle}>Cart</div>
            </div>
            <CartItems cartState={cartState} dispatchCart={dispatchCart} />
          </div>
        </div>
      </div>
    </>
  );
}
