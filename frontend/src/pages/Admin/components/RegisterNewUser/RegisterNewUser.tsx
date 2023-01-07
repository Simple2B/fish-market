import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { CustomBtn, ErrorMessage } from "../../../../components";
import { ManagerOutletContextAdmin } from "../../../../main.type";
import { isValidNumber, phoneNumberAutoFormat } from "../../../../services";
import style from "./RegisterNewUser.module.css";

type RegisterNewUserInputs = {
  user_type: string;
  name: string;
  address: string;
  business_phone_number: string;
  username: string;
  user_phone_number: string;
  email: string;
  password: string;
};

const RegisterNewUser = () => {
  const { handlerRegisterNewUser } =
    useOutletContext<ManagerOutletContextAdmin>();

  const submitBtn = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterNewUserInputs>();

  const handlerOnConfirm = (data: RegisterNewUserInputs) => {
    console.log("confirm");

    if (!data) return;
    console.log("data", { data });
  };

  const handlerOnchangePhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const targetValue = phoneNumberAutoFormat(e.target.value);

    if (e.target.name === "user_phone_number") {
      setValue("user_phone_number", targetValue);
    }
    if (e.target.name === "business_phone_number") {
      setValue("business_phone_number", targetValue);
    }
  };

  console.log(errors, "errors");

  return (
    <div className={style.registerNewUserContent}>
      <div>Register New User</div>
      <form
        className={style.registerNewUserForm}
        onSubmit={handleSubmit(handlerOnConfirm)}
      >
        <div className={style.registerNewUserFormWrap}>
          <div className={style.formLabel}>User type </div>
          <div className={style.formLabel}>Business name</div>
          <div className={style.formLabel}>Business address</div>
          <div className={style.formLabel}>Business phone number</div>
          <hr />
          <div className={style.formLabel}>Representative name</div>
          <div className={style.formLabel}>Representative phone number</div>
          <hr />
          <div className={style.formLabel}>Email (Used for login)</div>
          <div className={style.formLabel}>Password</div>
        </div>
        <div className={style.registerNewUserFormWrap}>
          <input
            type="text"
            className={style.formInput}
            placeholder="Type here"
            {...register("user_type", { required: true })}
          />
          <input
            type="text"
            className={style.formInput}
            placeholder="Type here"
            {...register("name", { required: true })}
          />
          <input
            type="text"
            className={style.formInput}
            placeholder="Type here"
            {...register("address", { required: true })}
          />
          <input
            type="tel"
            maxLength={14}
            className={style.formInput}
            placeholder="Type here"
            {...register("business_phone_number", {
              required: true,
              maxLength: 14,
              minLength: 10,
              validate: isValidNumber,
              onChange: handlerOnchangePhoneNumber,
            })}
          />
          <hr />
          <input
            type="text"
            className={style.formInput}
            placeholder="Type here"
            {...register("username", { required: true })}
          />
          <input
            type="tel"
            maxLength={14}
            className={style.formInput}
            placeholder="Type here"
            {...register("user_phone_number", {
              required: true,
              maxLength: 14,
              minLength: 10,
              validate: isValidNumber,
              onChange: handlerOnchangePhoneNumber,
            })}
          />
          <hr />
          <input
            type="email"
            className={style.formInput}
            placeholder="Type here"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            className={style.formInput}
            placeholder="Type here"
            {...register("password", { required: true })}
          />
        </div>
        <button
          type="submit"
          ref={submitBtn}
          style={{ display: "none" }}
        ></button>
      </form>
      {Object.keys(errors).length >= 1 && (
        <ErrorMessage text={"One of the inputs data is incorrect"} />
      )}
      <div className={style.contentButtons}>
        <CustomBtn
          btnName="Confirm"
          handlerOnClick={() => {
            submitBtn.current?.click();
          }}
        />
        <CustomBtn btnName="Cancel" handlerOnClick={handlerRegisterNewUser} />
      </div>
    </div>
  );
};

export { RegisterNewUser };
