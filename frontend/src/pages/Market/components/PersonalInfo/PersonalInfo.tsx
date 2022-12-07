import React from "react";
import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";

import { ErrorMessage } from "./ErrorMessage";
import style from "./PersonalInfo.module.css";
import { useMutation } from "@tanstack/react-query";

type PersonalInfoProps = {
  onConfirm: () => void;
  submitRef: React.RefObject<HTMLButtonElement>;
};

type PersonalInfoFormValues = {
  phone_number: string;
  full_name: string;
  note: string;
};

const PersonalInfo = ({ onConfirm, submitRef }: PersonalInfoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormValues>();

  const mutation = useMutation({
    mutationFn: (dataForm: PersonalInfoFormValues) => {
      console.log(dataForm, "data");

      return fetch(`${import.meta.env.VITE_API_BASE_URL}/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
    },
  });

  const contentNote = classNames(style.contentInput, style.contentWrapNote);

  const handleSubmitBtn: SubmitHandler<PersonalInfoFormValues> = (data) => {
    if (data) {
      const newData = {
        ...data,
        phone_number: data.phone_number.startsWith("+")
          ? data.phone_number.slice(1)
          : data.phone_number,
      };
      mutation.mutate(newData);
    }
    // onConfirm();
  };

  console.log(mutation);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitBtn)}
      className={style.personalInfoContent}
    >
      <div className={style.contentWrap}>
        <div className={style.contentWrapLabel}>Phone number</div>
        <input
          {...register("phone_number", {
            required: true,
            minLength: 12,
            maxLength: 13,
            validate: {
              isValidNumber: (v) => {
                if (!v.startsWith("+")) {
                  v = `+${v}`;
                }
                return isValidPhoneNumber(v);
              },
            },
          })}
          className={style.contentInput}
          placeholder="+972 55 85 55 642"
        />
        {errors.phone_number && (
          <ErrorMessage text="Phone number should consist from 12 characters. Please provide a valid phone number." />
        )}
      </div>

      <div className={style.contentWrap}>
        <div className={style.contentWrapLabel}>Name</div>
        <input
          {...register("full_name", {
            required: true,
            minLength: 3,
            maxLength: 127,
          })}
          className={style.contentInput}
          placeholder="Enter your name"
        />
        {errors.full_name && (
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
