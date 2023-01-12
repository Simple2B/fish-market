import {
  settingsViewKey,
  SETTINGS_VIEW_TEXT_DATA,
} from "../../../../../../constants";
import style from "./UploadImage.module.css";

type UploadImageProps = {
  children: React.ReactNode;
  imageUrl?: string;
};

const textDataUploadImage =
  SETTINGS_VIEW_TEXT_DATA[settingsViewKey.UPLOAD_IMAGE];

const UploadImage = ({ children, imageUrl }: UploadImageProps) => {
  return (
    <div className={style.fileInputContent}>
      {imageUrl ? (
        <img
          className={style.previewImage}
          src={imageUrl}
          alt="Preview image"
        />
      ) : (
        <div className={style.fileInputText}>{textDataUploadImage}</div>
      )}
      {children}
    </div>
  );
};

export { UploadImage };
