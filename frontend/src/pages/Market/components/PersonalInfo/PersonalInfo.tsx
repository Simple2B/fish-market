import React from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";

import { ErrorInput } from "./ErrorInput";
import style from "./PersonalInfo.module.css";

type Props = {};

const PersonalInfo = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const contentNote = classNames(style.contentInput, style.contentWrapNote);

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data, "data"))}
      className={style.personalInfoContent}
    >
      <div className={style.contentWrap}>
        <div className={style.contentWrapLabel}>Phone number</div>
        {/* pattern: /\d+/ */}
        <input
          {...(register("phoneNumber"), { required: true })}
          className={style.contentInput}
          placeholder="Enter your phone number"
        />
        {errors.phoneNumber && (
          <ErrorInput text="Phone number should consist from 10 characters. Please provide a valid phone number." />
        )}
      </div>

      <div className={style.contentWrap}>
        <div className={style.contentWrapLabel}>Name</div>
        <input
          {...register("name", { required: true })}
          className={style.contentInput}
          placeholder="Enter your name"
        />
        {errors.name && (
          <ErrorInput text="Your name should consist from minimum 3 characters. Please provide a valid name." />
        )}
      </div>
      <div className={style.contentWrap}>
        <div className={style.contentWrapLabel}>Add notes (optional)</div>
        <textarea
          {...register("note")}
          className={contentNote}
          placeholder="Type here"
        />
      </div>
      <input type="submit" />
    </form>
  );
};

export { PersonalInfo };
