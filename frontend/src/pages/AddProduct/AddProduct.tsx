import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CustomBtn } from "../../components";
import { settingsViewKey, SETTINGS_VIEW_TEXT_DATA } from "../../constants";
import { isTokenValid } from "../../services";
import { CHECK_TOKEN_CHANGE_PASSWORD } from "../../services/queryKeys";

import style from "./AddProduct.module.css";
import { CreateProduct } from "./components/CreateProduct";

const textData = SETTINGS_VIEW_TEXT_DATA;

const AddProduct = () => {
  const navigator = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [CHECK_TOKEN_CHANGE_PASSWORD],
    queryFn: isTokenValid,
  });

  if (!isLoading && !data) {
    navigator("/");
  }

  const handlerCancelBtn = () => {
    navigator("/settings");
  };

  return (
    <div className={style.addProductContent}>
      <div className={style.addProductContentTitle}>
        {textData[settingsViewKey.ADD_NEW_ITEM]}
      </div>
      <CreateProduct />
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
