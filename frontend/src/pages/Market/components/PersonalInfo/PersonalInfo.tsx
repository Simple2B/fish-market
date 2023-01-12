import React, { useEffect } from "react";
import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";

import style from "./PersonalInfo.module.css";
import { useMutation } from "@tanstack/react-query";
import { createCheckPhoneNumber } from "../../../../services";
import {
  MarketActionTypes,
  ISetOrderData,
  IProduct,
  IOrder,
} from "../../Market.type";
import {
  createOrder,
  isValidNumber,
  phoneNumberAutoFormat,
  replaceDash,
  rewriteCurrentDate,
} from "../../../../services/marketService";
import { ErrorMessage } from "../../../../components";

const inputPhoneNumber = "phone_number";

type PersonalInfoProps = {
  setIsPersonalInfoFill: (n: boolean) => void;

  isPhoneView: boolean;
  onConfirm: () => void;
  dispatchOrder: (action: ISetOrderData) => void;
  submitRef: React.RefObject<HTMLButtonElement>;
  marketId: string;
  cartState: IProduct[];
  orderState: IOrder;
};

type PersonalInfoFormValues = {
  phone_number: string;
  full_name: string;
  pick_up_data: Date | string;
  note: string;
};

const PersonalInfo = ({
  onConfirm,
  submitRef,
  dispatchOrder,
  cartState,
  orderState,
  marketId,
  isPhoneView,
  setIsPersonalInfoFill,
}: PersonalInfoProps) => {
  const currentDate = rewriteCurrentDate(orderState.pick_up_data);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PersonalInfoFormValues>({
    defaultValues: {
      pick_up_data: currentDate,
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (!isPhoneView) return;
      if (value.full_name && value.phone_number && value.pick_up_data) {
        setIsPersonalInfoFill(true);
      } else {
        setIsPersonalInfoFill(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
      const [fullName, noteValue, pickUpDate] = getValues([
        "full_name",
        "note",
        "pick_up_data",
      ]);

      const correctPickUpDate = new Date(pickUpDate);

      dispatchOrder({
        type: MarketActionTypes.SET_ORDER_DATA,
        payload: {
          phoneNumber: data.number,
          isNumberVerified: data.is_number_verified,
          name: fullName,
          note: noteValue,
          pick_up_data: correctPickUpDate,
        },
      });

      if (data.is_number_verified) {
        const resData = {
          body: {
            phone_number: data.number,
            customer_name: fullName,
            note: noteValue,
            pick_up_data: correctPickUpDate,
            items: cartState.map((product) => {
              return {
                prep_id: product.prepId,
                qty: product.qty,
                unit_type: product.itemType == "Kg" ? "by_kilogram" : "by_unit",
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
        business_uid: marketId,
      };
      mutation.mutate(phoneNumber);
    }
  };

  const handlerOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = phoneNumberAutoFormat(e.target.value);
    setValue(inputPhoneNumber, targetValue);
  };

  const handlerOnChangePickUpDate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("pick_up_data", e.target.value);
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
      <div
        style={isPhoneView ? {} : { display: "none" }}
        className={style.contentWrap}
      >
        <div className={style.contentWrapLabel}>Pickup Date</div>
        <input
          type="date"
          {...register("pick_up_data", {
            required: true,
            onChange: handlerOnChangePickUpDate,
          })}
          className={style.contentInput}
          min={currentDate}
          disabled={mutation.isLoading}
        />
        {errors.pick_up_data && <ErrorMessage text="Pickup Date is required" />}
      </div>
      <div className={style.contentWrap}>
        <div className={style.contentWrapLabel}>Add notes (optional)</div>
        <textarea
          {...register("note", { maxLength: 150 })}
          className={contentNote}
          placeholder="Type here"
          disabled={mutation.isLoading}
          maxLength={150}
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
