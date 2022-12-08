import React from "react";
import style from "./ConfirmCode.module.css";
import { ConfirmCodeForm } from "./ConfirmCodeForm";

type ConfirmCodeProps = {};

const ConfirmCode = (props: ConfirmCodeProps) => {
  return (
    <div className={style.confirmCodePage}>
      <div className={style.titlePage}>Phone number confirmation</div>
      <div className={style.textPage}>
        We sent an SMS to your number. Please enter a confirmation code below.
      </div>
      <ConfirmCodeForm />
    </div>
  );
};

export { ConfirmCode };
