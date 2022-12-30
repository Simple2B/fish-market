import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiCheck } from "react-icons/bi";
import { LeftPanelType } from "../../../../../../main.type";
import { queryClient } from "../../../../../../queryClient";
import {
  GET_USER_BUSINESS,
  updateBusinessInfo,
} from "../../../../../../services";
import style from "./BusinessInfoUpdate.module.css";

type Inputs = {
  businessLogo: string;
  businessName: string;
  userEmail: string;
};

const BusinessInfoUpdate = ({
  logo,
  name,
  user_email,
  handlerEditBtn,
}: LeftPanelType & { handlerEditBtn: () => void }) => {
  const mutationUpdateBusinessInfo = useMutation({
    mutationFn: updateBusinessInfo,
    onSuccess: (data) => {
      queryClient.invalidateQueries([GET_USER_BUSINESS]);
      handlerEditBtn();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      businessLogo: logo,
      businessName: name,
      userEmail: user_email,
    },
  });

  const handlerOnSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data) return;

    const reqData: { name?: string; user_email?: string } = {};

    if (typeof data.businessLogo !== "string") {
      console.log("upload img", data.businessLogo);
    }

    if (data.businessName !== name) {
      reqData.name = data.businessName;
    }
    if (data.userEmail !== user_email) {
      reqData.user_email = data.userEmail;
    }
    console.log(Object.keys(reqData).length === 0, "reqData", reqData);

    if (Object.keys(reqData).length === 0) {
      handlerEditBtn();
      return;
    }
    mutationUpdateBusinessInfo.mutate(reqData);
  };

  return (
    <form
      onSubmit={handleSubmit(handlerOnSubmit)}
      className={style.formContent}
    >
      <div className={style.fileInputRow}>
        <div className={style.fileInputText}>upload image</div>
        <input
          className={style.fileInput}
          type="file"
          accept="image/*"
          {...register("businessName")}
        />
      </div>
      <div className={style.textInputContent}>
        <div className={style.textInputContentWrap}>
          <span>Business name</span>
          <input
            className={style.textInput}
            type="text"
            {...register("businessName", { required: true })}
          />
        </div>
        <div className={style.textInputContentWrap}>
          <span>Email</span>
          <input
            className={style.textInput}
            type="email"
            {...register("userEmail", { required: true })}
          />
        </div>
      </div>
      <button className={style.acceptBtn}>
        <BiCheck className={style.acceptBtnWrap} />
      </button>
    </form>
  );
};

export { BusinessInfoUpdate };
