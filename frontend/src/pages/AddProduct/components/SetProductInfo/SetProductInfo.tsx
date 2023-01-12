import { useState } from "react";
import { useForm } from "react-hook-form";
import { validateImageFile } from "../../../../services";
import { UploadImage } from "../../../Home";
import {
  CreateProductActionKeys,
  ISetAddProductInfo,
} from "../../AddProduct.type";
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
  const [imageUrl, setImageUrl] = useState<string>("");

  const handlerOnChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    let payloadKey = e.target.name;
    let payloadValue: string | number | File = e.target.value;

    if (payloadKey === "price") {
      if (isNaN(Number(payloadValue))) return;
      payloadValue = Number(payloadValue);
    }

    if (payloadKey === "image") {
      if (!e.target.files) return;

      const file = e.target.files[0];
      const isImage = validateImageFile(file);

      if (!isImage) return;

      const imaUrl = URL.createObjectURL(file);
      setImageUrl(imaUrl);
      payloadValue = file;
    }

    productDispatch({
      type: CreateProductActionKeys.ADD_PRODUCT_VALUE,
      payload: { [payloadKey]: payloadValue },
    });
  };

  const validateFileInput = (input: string | FileList) => {
    if (typeof input === "string") {
      return true;
    }
    return validateImageFile(input[0]);
  };

  return (
    <div className={style.setProductInfoContent}>
      <UploadImage imageUrl={imageUrl}>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
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
              validate: validateFileInput,
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
