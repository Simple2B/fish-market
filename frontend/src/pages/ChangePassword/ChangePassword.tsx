import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomBtn, ErrorMessage } from "../../components";
import {
  changePasswordKeys,
  CHANGE_PASSWORD_INPUT_DATA,
  settingsViewKey,
  SETTINGS_VIEW_TEXT_DATA,
} from "../../constants";
import { changePasswordRequest, isTokenValid, notify } from "../../services";
import { CHECK_TOKEN_CHANGE_PASSWORD } from "../../services/queryKeys";
import style from "./ChangePassword.module.css";

const textDataButtons = SETTINGS_VIEW_TEXT_DATA;
const textDataInputs = CHANGE_PASSWORD_INPUT_DATA;

type Inputs = {
  password: string;
  new_password: string;
  repeat_password: string;
};

const ChangePassword = () => {
  let navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: [CHECK_TOKEN_CHANGE_PASSWORD],
    queryFn: isTokenValid,
  });

  if (!isLoading && !data) {
    navigate("/");
  }
  const {
    register,
    handleSubmit,
    setError,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const mutationChangePassword = useMutation({
    mutationFn: changePasswordRequest,
    onSuccess: async (data) => {
      if (data) {
        notify(textDataButtons[settingsViewKey.NOTIFY_MES]);
        navigate("/settings");
      }
    },
    onError: async (err) => {
      setError("password", {
        type: "bad password",
        message: "Please provide a valid password.",
      });
      console.log(err);

      mutationChangePassword.reset();
    },
  });

  const handlerSubmitBtn: SubmitHandler<Inputs> = (data) => {
    console.log("here1");

    if (!data) {
      return;
    }
    console.log("here2");

    const reqData = {
      password: data.password,
      new_password: data.new_password,
    };
    mutationChangePassword.mutate(reqData);
  };

  const btnStyle = classNames(style.disableBtn, {
    [style.activeBtn]:
      watch("password") && watch("new_password") && watch("repeat_password"),
  });

  return (
    <div className={style.changePasswordContent}>
      <form
        onSubmit={handleSubmit(handlerSubmitBtn)}
        className={style.changePasswordForm}
      >
        <div className={style.changePasswordTitle}>
          {textDataButtons[settingsViewKey.CHANGE_PASSWORD]}
        </div>
        <div className={style.rowForm}>
          <div className={style.label}>
            {textDataInputs[changePasswordKeys.OLD_PASSWORD]}
          </div>
          <input
            type="password"
            placeholder={textDataInputs[changePasswordKeys.PLACEHOLDER]}
            className={style.inputForm}
            {...register("password", {
              required: "The field is required",
            })}
          />
          {errors.password && <ErrorMessage text={errors.password.message!} />}
        </div>
        <div className={style.rowForm}>
          <div className={style.label}>
            {textDataInputs[changePasswordKeys.NEW_PASSWORD]}
          </div>
          <input
            type="password"
            placeholder={textDataInputs[changePasswordKeys.PLACEHOLDER]}
            className={style.inputForm}
            {...register("new_password", {
              required: "The field is required",
            })}
          />
          {errors.new_password && (
            <ErrorMessage text={errors.new_password.message!} />
          )}
        </div>
        <div className={style.rowForm}>
          <div className={style.label}>
            {textDataInputs[changePasswordKeys.REPEAT_NEW_PASSWORD]}
          </div>
          <input
            type="password"
            placeholder={textDataInputs[changePasswordKeys.PLACEHOLDER]}
            className={style.inputForm}
            {...register("repeat_password", {
              required: "The field is required",
              validate: (value) =>
                value === getValues("new_password") ||
                textDataInputs[changePasswordKeys.NOT_REPEAT_ERR],
            })}
          />
          {errors.repeat_password && (
            <ErrorMessage text={errors.repeat_password.message!} />
          )}
        </div>

        <CustomBtn
          btnName={textDataButtons[settingsViewKey.CONFIRM]}
          additionalStyles={btnStyle}
        />
      </form>
    </div>
  );
};

export { ChangePassword };
