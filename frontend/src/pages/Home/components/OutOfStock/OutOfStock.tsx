import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../../../components";
import { API_BASE_URL } from "../../../../constants";
import { UserProductsOut } from "../../../../main.type";
import { GET_USER_PRODUCTS, TOKEN_KEY } from "../../../../services";
import style from "./OutOfStock.module.css";
import { Product } from "./Product";
import { ResetBtn } from "./ResetBtn";

type ProductId = Pick<UserProductsOut, "id">;

const OutOfStock = () => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_USER_PRODUCTS],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/product/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem(TOKEN_KEY);
        return false;
      }

      const data = await res.json();

      return data.products.sort((a: ProductId, b: ProductId) => a.id - b.id);
    },
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={style.pageContent}>
      <div className={style.pageContentWrap}>
        {data && <ResetBtn />}
        {data.map((product: UserProductsOut) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export { OutOfStock };
