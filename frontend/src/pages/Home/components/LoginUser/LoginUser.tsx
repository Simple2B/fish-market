import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { ErrorMessage } from "../../..";
import style from "./LoginUser.module.css";
import { loginUser } from "../../../../services/homeService";
import { TOKEN_KEY } from "../../../../constants";
import { useState } from "react";
import { queryClient } from "../../../../queryClient";

type Inputs = {
  username: string;
  password: string;
};

const LoginUser = () => {
  const mutationLoginUser = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data: { access_token: string; token_type: string }) => {
      console.log("Set token", data);

      localStorage.setItem(TOKEN_KEY, data.access_token);
      queryClient.invalidateQueries(["checkToken"]);
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
    [style.formBtnEnable]: watch("username") && watch("password"),
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

        <div>
          <div className={style.formLabel}>Email</div>
          <input
            type="text"
            {...register("username", { required: "The field is required" })}
            className={style.formInput}
            placeholder="Type here"
          />
          {errors.username && <ErrorMessage text={errors.username.message!} />}
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
