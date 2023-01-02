import { useForm } from "react-hook-form";
import { UploadImage } from "../../../Home";
import style from "./SetProductInfo.module.css";

type Props = {};

type SetProductInfoInputs = {
  name: string;
  price: string;
  image: string;
};

const SetProductInfo = (props: Props) => {
  const { register, watch } = useForm<SetProductInfoInputs>();

  return (
    <div className={style.setProductInfoContent}>
      <UploadImage>
        <input
          type="file"
          {...register("image", { required: true })}
          className={style.inputFile}
        />
      </UploadImage>
      <div className={style.setProductInfoContentWrap}>
        <div>
          <div>Name</div>
          <input
            type="text"
            {...register("name", { required: true })}
            className={style.inputData}
          />
        </div>

        <div>
          <div>Price per kg</div>
          <input
            type="text"
            {...register("price", { required: true })}
            className={style.inputData}
          />
        </div>
      </div>
    </div>
  );
};

export { SetProductInfo };
