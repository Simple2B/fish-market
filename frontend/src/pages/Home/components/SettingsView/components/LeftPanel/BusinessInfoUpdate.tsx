import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiCheck } from "react-icons/bi";
import {
  changePasswordKeys,
  CHANGE_PASSWORD_INPUT_DATA,
  settingsViewKey,
  SETTINGS_VIEW_TEXT_DATA,
} from "../../../../../../constants";
import { ImageType, LeftPanelType } from "../../../../../../main.type";
import { queryClient } from "../../../../../../queryClient";
import {
  GET_USER_BUSINESS,
  updateBusinessInfo,
  uploadImage,
  validateImageFile,
} from "../../../../../../services";
import { UploadImage } from "../UploadImage";
import style from "./BusinessInfoUpdate.module.css";

const textData = SETTINGS_VIEW_TEXT_DATA;
const placeholder = CHANGE_PASSWORD_INPUT_DATA[changePasswordKeys.PLACEHOLDER];

type Inputs = {
  businessLogo: string | FileList;
  businessName: string;
  userEmail: string;
};

const BusinessInfoUpdate = ({
  id,
  logo,
  name,
  user_email,
  handlerEditBtn,
}: LeftPanelType & { handlerEditBtn: () => void }) => {
  const mutationUpdateBusinessInfo = useMutation({
    mutationFn: updateBusinessInfo,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_USER_BUSINESS]);
      handlerEditBtn();
    },
  });

  const mutationUploadImage = useMutation({
    mutationFn: uploadImage,
  });

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      businessLogo: logo,
      businessName: name,
      userEmail: user_email,
    },
  });

  const [imageUrl, setImageUrl] = useState<string>("");

  const handlerOnSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data) return;

    const reqData: { logo?: string; name?: string; user_email?: string } = {};

    if (typeof data.businessLogo !== "string" && data.businessLogo.length > 0) {
      const uploadImageData = {
        business_id: id,
        imageType: ImageType.logo,
        file: data.businessLogo[0],
      };
      const mutateData = await mutationUploadImage.mutateAsync(uploadImageData);

      if (mutateData !== undefined) {
        reqData.logo = mutateData.img_url;
      }
    }

    if (data.businessName !== name) {
      reqData.name = data.businessName;
    }
    if (data.userEmail !== user_email) {
      reqData.user_email = data.userEmail;
    }

    if (Object.keys(reqData).length === 0) {
      handlerEditBtn();
      return;
    }

    mutationUpdateBusinessInfo.mutate(reqData);
  };

  const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const isImage = validateImageFile(file);
      if (!isImage) return;
      const imaUrl = URL.createObjectURL(file);
      setImageUrl(imaUrl);
    }
  };

  const validateFileInput = (input: string | FileList) => {
    if (typeof input === "string") {
      return true;
    }
    return validateImageFile(input[0]);
  };

  return (
    <form
      onSubmit={handleSubmit(handlerOnSubmit)}
      className={style.formContent}
    >
      <UploadImage imageUrl={imageUrl}>
        <input
          className={style.fileInput}
          type="file"
          accept=".png, .jpg, .jpeg"
          {...register("businessLogo", {
            onChange: onChangeFileInput,
            validate: validateFileInput,
          })}
        />
      </UploadImage>
      <div className={style.textInputContent}>
        <div className={style.textInputContentWrap}>
          <span>{textData[settingsViewKey.BUSINESS_NAME]}</span>
          <input
            className={style.textInput}
            type="text"
            placeholder={placeholder}
            {...register("businessName", { required: true })}
          />
        </div>
        <div className={style.textInputContentWrap}>
          <span>{textData[settingsViewKey.EMAIL_NAME]}</span>
          <input
            className={style.textInput}
            type="email"
            placeholder={placeholder}
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
