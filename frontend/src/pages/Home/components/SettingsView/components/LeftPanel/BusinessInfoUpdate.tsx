import { useForm } from "react-hook-form";
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
        <input className={style.textInput} type="text" {...register("name")} />
        <input
          className={style.textInput}
          type="email"
          {...register("user_email")}
        />
      </div>
      <button>+</button>
    </form>
  );
};

export { BusinessInfoUpdate };
