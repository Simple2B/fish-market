import style from "./ShowUpdateProduct.module.css";
import { FiTrash2 } from "react-icons/fi";

type DeleteProductBtnProps = {
  handlerDeleteProduct: () => void;
};

const DeleteProductBtn = ({ handlerDeleteProduct }: DeleteProductBtnProps) => {
  return (
    <div className={style.deleteProductBtn}>
      <div className={style.deleteProductBtnWrap}>
        <FiTrash2
          className={style.deleteProductBtnIcon}
          onClick={handlerDeleteProduct}
        />
      </div>
    </div>
  );
};

export { DeleteProductBtn };
