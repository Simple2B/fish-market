import {
  settingsViewKey,
  SETTINGS_VIEW_TEXT_DATA,
} from "../../../../../../constants";
import style from "./UploadImage.module.css";

type UploadImageProps = {
  children: React.ReactNode;
};

const textDataUploadImage =
  SETTINGS_VIEW_TEXT_DATA[settingsViewKey.UPLOAD_IMAGE];

const UploadImage = ({ children }: UploadImageProps) => {
  return (
    <div className={style.fileInputContent}>
      <div className={style.fileInputText}>{textDataUploadImage}</div>
      {children}
    </div>
  );
};

export { UploadImage };
