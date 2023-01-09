import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "../../../../components";

import {
  createCheckPhoneNumber,
  validatePhoneNumber,
} from "../../../../services";
import { createOrder } from "../../../../services/marketService";
import {
  IOrder,
  IProduct,
  ISetOrderNumberIsVerified,
  MarketActionTypes,
} from "../../Market.type";

import style from "./ConfirmCodeForm.module.css";

type ConfirmCodeFormProps = {
  dispatchOrder: (action: ISetOrderNumberIsVerified) => void;
  onConfirm: () => void;
  orderState: IOrder;
  cartState: IProduct[];
  marketId: string;
};

type ConfirmCodeFormValue = {
  sms_code: string;
};

const ConfirmCodeForm = ({
  dispatchOrder,
  orderState,
  cartState,
  marketId,
  onConfirm,
}: ConfirmCodeFormProps) => {
  const mutationSendAgain = useMutation({
    mutationFn: createCheckPhoneNumber,
  });

  const mutationCreateOrder = useMutation({
    mutationFn: createOrder,
    onSuccess: async () => {
      console.log("Order is created");
    },
    onError: async (err) => {
      console.error(`Create order error ${err}`);
    },
  });

  const mutationConfirmCode = useMutation({
    mutationFn: validatePhoneNumber,
    onSuccess: async (data: {
      number: string;
      is_number_verified: boolean;
    }) => {
      dispatchOrder({
        type: MarketActionTypes.SET_NUMBER_IS_VERIFIED,
        payload: data.is_number_verified,
      });
      if (data.is_number_verified) {
        const resData = {
          body: {
            phone_number: orderState.phoneNumber,
            customer_name: orderState.name,
            note: orderState.note,
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
      setError("sms_code", {
        type: "smsCode",
        message:
          'Your code is incorrect, please enter the incorrect code or click on "Send again" to get a new code',
      });
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ConfirmCodeFormValue>();

  const handlerSubmitBtn: SubmitHandler<ConfirmCodeFormValue> = (data) => {
    if (data) {
      const resData = { ...data, phone_number: orderState.phoneNumber };
      mutationConfirmCode.mutate(resData);
    }
  };

  const handlerSendAgainBtn = () => {
    mutationSendAgain.mutate({ phone_number: orderState.phoneNumber });
  };

  return (
    <div className={style.confirmCodeFormPage}>
      <form
        className={style.formContent}
        onSubmit={handleSubmit(handlerSubmitBtn)}
      >
        <div className={style.formLabelText}>Confirmation code</div>
        <input
          {...register("sms_code", {
            required: "The field is required",
            minLength: {
              value: 6,
              message: "The field must have 6 digits", // JS only: <p>error message</p> TS only support string
            },
            maxLength: {
              value: 6,
              message: "The field must have 6 digits", // JS only: <p>error message</p> TS only support string
            },
          })}
          className={style.smsCode}
          placeholder="Enter your code"
        />
        {errors.sms_code && <ErrorMessage text={errors.sms_code.message!} />}
        <button
          type="submit"
          className={style.submitBtn}
          disabled={mutationConfirmCode.isLoading}
        >
          Confirm
        </button>
      </form>
      <div className={style.contentSendAgain}>
        <div>Did not receive a code?</div>
        <button
          className={style.btnSendAgain}
          onClick={handlerSendAgainBtn}
          disabled={mutationSendAgain.isLoading}
        >
          Send again.
        </button>
      </div>
    </div>
  );
};

export { ConfirmCodeForm };
