import React from "react";
import style from "./NextClient.module.css";

type Props = {};

const NextClient = (props: Props) => {
  return (
    <div className={style.nextClientPage}>
      <div className={style.nextClientTitle}>Order confirmed!</div>
      <div className={style.nextClientContent}>
        <div>Thank you for using our services!</div>
        <div>You will receive SMS with order details to your phone number.</div>
        <div>We will also send you SMS once your order is ready.</div>
      </div>
    </div>
  );
};

export { NextClient };
