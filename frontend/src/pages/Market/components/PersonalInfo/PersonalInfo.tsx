import React, { useEffect } from "react";
import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";

import style from "./PersonalInfo.module.css";
import { useMutation } from "@tanstack/react-query";
import { createCheckPhoneNumber } from "../../../../services";
import { MarketActionTypes, ISetOrderData, IProduct } from "../../Market.type";
import {
  createOrder,
  isValidNumber,
  phoneNumberAutoFormat,
  replaceDash,
} from "../../../../services/marketService";
import { ErrorMessage } from "../../../../components";

const inputPhoneNumber = "phone_number";

type PersonalInfoProps = {
  onConfirm: () => void;
  dispatchOrder: (action: ISetOrderData) => void;
  submitRef: React.RefObject<HTMLButtonElement>;
  marketId: string;
  cartState: IProduct[];
};

type PersonalInfoFormValues = {
  phone_number: string;
  full_name: string;
  note: string;
};

const PersonalInfo = ({
  onConfirm,
  submitRef,
  dispatchOrder,
  cartState,
  marketId,
}: PersonalInfoProps) => {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfoFormValues>();

  const mutationCreateOrder = useMutation({
    mutationFn: createOrder,
    onSuccess: async () => {
      console.log("Order is created");
    },
    onError: async (err) => {
      console.error(`Create order error ${err}`);
    },
  });

  const mutation = useMutation({
    mutationFn: createCheckPhoneNumber,
    onSuccess: async (data: {
      number: string;
      is_number_verified: boolean;
    }) => {
      const [fullName, noteValue] = getValues(["full_name", "note"]);

      dispatchOrder({
        type: MarketActionTypes.SET_ORDER_DATA,
        payload: {
          phoneNumber: data.number,
          isNumberVerified: data.is_number_verified,
          name: fullName,
          note: noteValue,
        },
      });

      if (data.is_number_verified) {
        const resData = {
          body: {
            phone_number: data.number,
            customer_name: fullName,
            note: noteValue,
            items: cartState.map((product) => {
              return {
                prep_id: product.prepId,
                qty: product.qty,
                unit_type: product.itemType,
              };
            }),
          },
          business_uid: marketId,
        };

        mutationCreateOrder.mutate(resData);
      }

      onConfirm();
    },
    onError: async () => {
      setError(inputPhoneNumber, {
        type: "postNumber",
        message: "Please provide a valid phone number.",
      });
    },
  });

  const contentNote = classNames(style.contentInput, style.contentWrapNote);

  const handleSubmitBtn: SubmitHandler<PersonalInfoFormValues> = (data) => {
    if (data) {
      const phoneNumber = {
        phone_number: replaceDash(data.phone_number),
      };
      mutation.mutate(phoneNumber);
    }
  };

  const handlerOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = phoneNumberAutoFormat(e.target.value);
    setValue(inputPhoneNumber, targetValue);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitBtn)}
      className={style.personalInfoContent}
    >
      <div className={style.contentWrap}>
        <div className={style.contentWrapLabel}>Phone number</div>
        <input
          type="tel"
          maxLength={14}
          {...register(inputPhoneNumber, {
            required: true,
            maxLength: 14,
            minLength: 10,
            validate: isValidNumber,
            onChange: handlerOnchange,
          })}
          className={style.contentInput}
          placeholder="+972 55 85 55 642"
          disabled={mutation.isLoading}
        />
        {errors.phone_number && (
          <ErrorMessage
            text={
              errors.phone_number.type !== "postNumber"
                ? "Phone number should consist min from 10 characters. Please provide a valid phone number."
                : errors.phone_number.message!
            }
          />
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
          disabled={mutation.isLoading}
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
          disabled={mutation.isLoading}
        />
      </div>
      <button
        ref={submitRef}
        type="submit"
        style={{ display: "none" }}
        disabled={mutation.isLoading}
      />
    </form>
  );
};

export { PersonalInfo };
