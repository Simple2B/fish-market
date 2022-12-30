import { useForm } from "react-hook-form";
import { BiCheck } from "react-icons/bi";
import { LeftPanelType } from "../../../../../../main.type";
import style from "./BusinessInfoUpdate.module.css";

type Inputs = {
  logo: string;
  name: string;
  user_email: string;
};

const BusinessInfoUpdate = ({
  logo,
  name,
  user_email,
  handlerEditBtn,
}: LeftPanelType & { handlerEditBtn: () => void }) => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      logo: logo,
      name: name,
      user_email: user_email,
    },
  });

  console.log(user_email);

  return (
    <form onSubmit={handleSubmit(handlerEditBtn)} className={style.formContent}>
      <div className={style.fileInputRow}>
        <div className={style.fileInputText}>upload image</div>
        <input
          className={style.fileInput}
          type="file"
          accept="image/*"
          {...register("logo")}
        />
      </div>
      <div className={style.textInputContent}>
        <div className={style.textInputContentWrap}>
          <span>Business name</span>
          <input
            className={style.textInput}
            type="text"
            {...register("name")}
          />
        </div>
        <div className={style.textInputContentWrap}>
          <span>Email</span>
          <input
            className={style.textInput}
            type="email"
            {...register("user_email")}
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
