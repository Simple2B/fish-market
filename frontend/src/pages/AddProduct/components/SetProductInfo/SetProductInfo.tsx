import { useForm } from "react-hook-form";
import { UploadImage } from "../../../Home";
import { CreateProductTypes, ISetAddProductInfo } from "../../AddProduct.type";
import style from "./SetProductInfo.module.css";

type SetProductInfoProps = {
  productDispatch: (action: ISetAddProductInfo) => void;
};

type SetProductInfoInputs = {
  name: string;
  price: string;
  image: string;
};

const SetProductInfo = ({ productDispatch }: SetProductInfoProps) => {
  const { register } = useForm<SetProductInfoInputs>();

  const handlerOnChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    let payloadKey = e.target.name;
    let payloadValue: string | number | File = e.target.value;

    if (payloadKey === "price") {
      if (isNaN(Number(payloadValue))) return;
      payloadValue = Number(payloadValue);
    }

    if (payloadKey === "image") {
      if (!e.target.files) return;
      payloadValue = e.target.files[0];
    }

    productDispatch({
      type: CreateProductTypes.ADD_PRODUCT_VALUE,
      payload: { [payloadKey]: payloadValue },
    });
  };

  return (
    <div className={style.setProductInfoContent}>
      <UploadImage>
        <input
          type="file"
          accept="image/*"
          {...register("image", {
            required: true,
            onChange: handlerOnChangeInputs,
          })}
          className={style.inputFile}
        />
      </UploadImage>
      <div className={style.setProductInfoContentWrap}>
        <div>
          <div>Name</div>
          <input
            type="text"
            {...register("name", {
              required: true,
              onChange: handlerOnChangeInputs,
            })}
            className={style.inputData}
          />
        </div>

        <div>
          <div>Price per kg</div>
          <input
            type="number"
            {...register("price", {
              required: true,
              onChange: handlerOnChangeInputs,
            })}
            className={style.inputData}
          />
        </div>
      </div>
    </div>
  );
};

export { SetProductInfo };
