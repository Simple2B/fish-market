import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../PersonalInfo/ErrorMessage";
import style from "./ConfirmCodeForm.module.css";

type ConfirmCodeFormProps = {};

const ConfirmCodeForm = (props: ConfirmCodeFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <div className={style.confirmCodeFormPage}>
      <form
        className={style.formContent}
        onSubmit={handleSubmit(() => console.log("hi"))}
      >
        <div className={style.formLabelText}>Confirmation code</div>
        <input
          {...register("sms_code", {
            required: true,
            minLength: 6,
            maxLength: 6,
          })}
          className={style.smsCode}
          placeholder="Enter your code"
        />
        {errors.sms_code && (
          <ErrorMessage text="The verification code is incorrect" />
        )}
        <button type="submit" className={style.submitBtn}>
          Confirm
        </button>
      </form>
      <div className={style.contentSendAgain}>
        <div>Did not receive a code?</div>
        <div
          className={style.btnSendAgain}
          onClick={() => console.log("Send again.")}
        >
          Send again.
        </div>
      </div>
    </div>
  );
};

export { ConfirmCodeForm };
