import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import style from "./LoginUser.module.css";
import { loginUser } from "../../../../services/homeService";
import { queryClient } from "../../../../queryClient";
import { ErrorMessage } from "../../../../components";
import { CHECK_TOKEN, TOKEN_KEY } from "../../../../services";

type Inputs = {
  email: string;
  password: string;
};

const LoginUser = () => {
  const mutationLoginUser = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data: { access_token: string; token_type: string }) => {
      localStorage.setItem(TOKEN_KEY, data.access_token);

      queryClient.invalidateQueries([CHECK_TOKEN]);
    },
    onError: async () => {
      setError("password", {
        type: "bad password",
        message: "Please provide a valid password.",
      });
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const styleBtnSubmit = classNames(style.formBtnDisable, {
    [style.formBtnEnable]: watch("email") && watch("password"),
  });

  const handlerSubmitBtn: SubmitHandler<Inputs> = (data) => {
    if (data) {
      mutationLoginUser.mutate(data);
    }
  };

  return (
    <div className={style.pageLoginUser}>
      <form
        className={style.pageLoginUserForm}
        onSubmit={handleSubmit(handlerSubmitBtn)}
      >
        <div className={style.formTitle}>Login</div>

        <div className={style.inputRow}>
          <div className={style.formLabel}>Email</div>
          <input
            type="email"
            {...register("email", {
              required: "The field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please provide a valid email address.",
              },
            })}
            className={style.formInput}
            placeholder="Type here"
          />
          {errors.email && <ErrorMessage text={errors.email.message!} />}
        </div>
        <div>
          <div className={style.formLabel}>Password</div>
          <input
            type="password"
            {...register("password", { required: "The field is required" })}
            className={style.formInput}
            placeholder="Type here"
          />
          {errors.password && <ErrorMessage text={errors.password.message!} />}
        </div>

        <button
          type="submit"
          className={styleBtnSubmit}
          disabled={mutationLoginUser.isLoading}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export { LoginUser };
