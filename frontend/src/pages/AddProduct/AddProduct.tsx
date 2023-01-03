import { useMutation, useQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { CustomBtn } from "../../components";
import { settingsViewKey, SETTINGS_VIEW_TEXT_DATA } from "../../constants";
import { ImageType } from "../../main.type";
import { getUserBusinessInfo, isTokenValid, uploadImage } from "../../services";
import { CHECK_TOKEN_CHANGE_PASSWORD } from "../../services/queryKeys";

import style from "./AddProduct.module.css";
import {
  createProductReducer,
  initialStateProduct,
} from "./AddProduct.reducer";
import { CreateProduct } from "./components/CreateProduct";

const textData = SETTINGS_VIEW_TEXT_DATA;

const AddProduct = () => {
  const navigator = useNavigate();

  const [newProductState, newProductDispatch] = useReducer(
    createProductReducer,
    initialStateProduct
  );

  const { data, isLoading } = useQuery({
    queryKey: [CHECK_TOKEN_CHANGE_PASSWORD],
    queryFn: isTokenValid,
  });

  if (!isLoading && !data) {
    navigator("/");
  }

  const mutationSetProductImage = useMutation({
    mutationFn: uploadImage,
  });

  const createProductImage = async (
    file: File
  ): Promise<string | undefined> => {
    const businessData = await getUserBusinessInfo();
    const business_id = businessData?.id;

    if (!business_id) return;

    const resData = await mutationSetProductImage.mutateAsync({
      business_id: business_id,
      imageType: ImageType.product,
      file: file,
    });

    console.log(resData, "resData");

    if (!resData) return;
    return resData.img_url;
  };

  const handlerCancelBtn = () => {
    navigator("/settings");
  };

  console.log(newProductState, "newProductState");

  return (
    <div className={style.addProductContent}>
      <div className={style.addProductContentTitle}>
        {textData[settingsViewKey.ADD_NEW_ITEM]}
      </div>
      <CreateProduct productDispatch={newProductDispatch} />
      <div className={style.addProductContentButtons}>
        <CustomBtn
          btnName={textData[settingsViewKey.ADD_ITEM]}
          additionalStyles={style.activeBtn}
        />
        <CustomBtn
          btnName={textData[settingsViewKey.CANCEL]}
          additionalStyles={style.activeBtn}
          handlerOnClick={handlerCancelBtn}
        />
      </div>
    </div>
  );
};

export { AddProduct };
