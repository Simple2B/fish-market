import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { ErrorMessage } from "../../..";

import style from "./LoginUser.module.css";

type Inputs = {
  userName: string;
  userPassword: string;
};

const LoginUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handlerSubmitBtn: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className={style.pageLoginUser}>
      <form
        className={style.pageLoginUserForm}
        onSubmit={handleSubmit(handlerSubmitBtn)}
      >
        <div className={style.formTitle}>Login</div>

        <div>
          <div className={style.formLabel}>Email</div>
          <input
            type="text"
            {...register("userName", { required: "The field is required" })}
            className={style.formInput}
            placeholder="Type here"
          />
          {errors.userName && <ErrorMessage text={errors.userName.message!} />}
        </div>
        <div>
          <div className={style.formLabel}>Password</div>
          <input
            type="password"
            {...register("userPassword", { required: "The field is required" })}
            className={style.formInput}
            placeholder="Type here"
          />
          {errors.userPassword && (
            <ErrorMessage text={errors.userPassword.message!} />
          )}
        </div>

        <button type="submit" className={style.formBtn}>
          Login
        </button>
      </form>
    </div>
  );
};

export { LoginUser };
