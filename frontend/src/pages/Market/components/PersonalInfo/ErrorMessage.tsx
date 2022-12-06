import React from "react";

import style from "./ErrorMessage.module.css";

type ErrorMessageProps = {
  text: string;
};

const ErrorMessage = ({ text }: ErrorMessageProps) => {
  return <div className={style.errorMessage}>{text}</div>;
};

export { ErrorMessage };
