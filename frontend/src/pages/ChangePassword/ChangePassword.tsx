import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomBtn, ErrorMessage } from "../../components";
import {
  changePasswordKeys,
  CHANGE_PASSWORD_INPUT_DATA,
  settingsViewBtnNameKeys,
  SETTINGS_VIEW_TEXT_DATA,
} from "../../constants";
import style from "./ChangePassword.module.css";

const textDataButtons = SETTINGS_VIEW_TEXT_DATA;
const textDataInputs = CHANGE_PASSWORD_INPUT_DATA;

type Inputs = {
  password: string;
  new_password: string;
  repeat_password: string;
};

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const handlerSubmitBtn: SubmitHandler<Inputs> = (data) => {
    if (!data) {
      return;
    }
    console.log(data);
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
          {textDataButtons[settingsViewBtnNameKeys.CHANGE_PASSWORD].btnName}
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
          btnName={textDataButtons[settingsViewBtnNameKeys.CONFIRM].btnName}
          additionalStyles={btnStyle}
        />
      </form>
    </div>
  );
};

export { ChangePassword };
