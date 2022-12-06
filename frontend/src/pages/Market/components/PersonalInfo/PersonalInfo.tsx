import React, { useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";
import style from "./PersonalInfo.module.css";

type PersonalInfoProps = {
  onConfirm: () => void;
  submitRef: React.RefObject<HTMLButtonElement>;
};

const PersonalInfo = ({ onConfirm, submitRef }: PersonalInfoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const contentNote = classNames(style.contentInput, style.contentWrapNote);

  const handleSubmitBtn = (data: object) => {
    console.log({ data });
    onConfirm();
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitBtn)}
      className={style.personalInfoContent}
    >
      <div className={style.contentWrap}>
        <div className={style.contentWrapLabel}>Phone number</div>
        {/* pattern: /\d+/ */}
        <input
          {...register("phoneNumber", { required: true })}
          className={style.contentInput}
          placeholder="Enter your phone number"
        />
        {errors.phoneNumber && (
          <ErrorMessage text="Phone number should consist from 10 characters. Please provide a valid phone number." />
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
          <ErrorMessage text="Your name should consist from minimum 3 characters. Please provide a valid name." />
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
      <button ref={submitRef} type="submit" style={{ display: "none" }} />
    </form>
  );
};

export { PersonalInfo };
