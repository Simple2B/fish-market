import style from "./UploadImage.module.css";

type UploadImageProps = {
  children: React.ReactNode;
};

const UploadImage = ({ children }: UploadImageProps) => {
  return (
    <div className={style.fileInputContent}>
      <div className={style.fileInputText}>upload image</div>
      {children}
    </div>
  );
};

export { UploadImage };
