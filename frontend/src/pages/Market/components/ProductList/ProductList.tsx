import { useQuery } from "@tanstack/react-query";
import { HiShoppingCart } from "react-icons/hi";
import { ProductItemProps } from "./ProductList.type";

import style from "./ProductList.module.css";
import { ProductItem } from "../ProductItem";
import { IProduct, MarketActions } from "../../Market.type";

import { API_BASE_URL } from "../../../../constants";
import { Spinner } from "../../../../components";
import { CartItems } from "../CartItems";

type Props = {
  isShowCart: boolean;
  marketId: string;
  cartState: IProduct[];
  dispatchCart: (action: MarketActions) => void;
};

export function ProductList({
  marketId,
  cartState,
  dispatchCart,
  isShowCart,
}: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [`marketProductList-${marketId}`],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/business/${marketId}/product`);
      const data: { products: ProductItemProps[] } = await res.json();

      return data.products.sort((a, b) => a.id - b.id);
    },
  });

  if (isShowCart && cartState.length > 0) {
    return (
      <div className={style.contentCartsPhoneView}>
        <div className={style.contentTitle}>Cart</div>
        <CartItems cartState={cartState} dispatchCart={dispatchCart} />
      </div>
    );
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className={style.pageContent}>
        <div className={style.contentItems}>
          <div className={style.contentTitle}>
            Choose your items{" "}
            <div className={style.iconCart}>
              <HiShoppingCart />
              {cartState.length >= 1 && (
                <div className={style.iconCartCount}>{cartState.length}</div>
              )}
            </div>{" "}
          </div>
          <div className={style.contentItemsSubTitle}>
            *The weight is roughly estimated, the order might arrive with up to
            35% margin of difference
          </div>
          <div className={style.contentItemsWrap}>
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
        <div className={style.contentCarts}>
          <div className={style.contentTitle}>Cart</div>
          <CartItems cartState={cartState} dispatchCart={dispatchCart} />
        </div>
      </div>
    </>
  );
}
