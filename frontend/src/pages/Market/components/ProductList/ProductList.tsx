import { useQuery } from "@tanstack/react-query";
import { ProductItemProps } from "./ProductList.type";

import style from "./ProductList.module.css";
import { ProductItem } from "../ProductItem";
import { IProduct, MarketActions } from "../../Market.type";
import { CartItems } from "../CartItems";

import Spinner from "../Spinner/Spinner";
import { API_BASE_URL } from "../../../../constants";

type Props = {
  marketId: string;
  cartState: IProduct[];
  dispatchCart: (action: MarketActions) => void;
};

export function ProductList({ marketId, cartState, dispatchCart }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [`marketProductList-${marketId}`],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/business/${marketId}/product`);
      const data: { products: ProductItemProps[] } = await res.json();

      return data.products;
    },
  });

  return isLoading ? (
    <Spinner />
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
                    dispatchCart={dispatchCart}
                    {...props}
                  />
                )
              )}
            </div>
          </div>
          <div className={style.productCardContent}>
            <div className={style.contentBlockTitle}>
              <div className={style.blockTitleCart}>Cart</div>
            </div>
            <CartItems cartState={cartState} dispatchCart={dispatchCart} />
          </div>
        </div>
      </div>
    </>
  );
}
