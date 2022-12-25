import style from "./Product.module.css";
import { useMutation } from "@tanstack/react-query";
import { GET_USER_PRODUCTS, isOutOfStock } from "../../../../services";
import classNames from "classnames";
import { UserProductsOut } from "../../../../main.type";
import { queryClient } from "../../../../queryClient";

const Product = ({
  id,
  name,
  image,
  price,
  is_out_of_stock,
}: Omit<UserProductsOut, "sold_by">) => {
  const mutationIsOutOfStock = useMutation({
    mutationFn: isOutOfStock,
    onSuccess: async (data) => {
      queryClient.invalidateQueries([GET_USER_PRODUCTS]);
    },
    onError: async (err) => {
      console.log(err, "mutationIsOutOfStock");
    },
  });

  const productContent = classNames(style.productContent, {
    [style.isOutOfStock]: is_out_of_stock,
  });

  const handlerProduct = () => {
    const res_data = {
      product_id: id,
      body: { is_out_of_stock: !is_out_of_stock },
    };
    console.log(id, res_data.body);
    mutationIsOutOfStock.mutate(res_data);
  };

  return (
    <div className={productContent} onClick={handlerProduct}>
      <div className={style.productImg}>
        <img className={style.productImgWrap} src={image} alt="product logo" />
      </div>
      <div className={style.productContentWrap}>
        <div>{name}</div>
        <div className={style.boldText}>${price} per kg</div>
      </div>
    </div>
  );
};

export { Product };
