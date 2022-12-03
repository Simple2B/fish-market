import React from "react";

import style from "./ErrorInput.module.css";

type ErrorInputProps = {
  text: string;
};

const ErrorInput = ({ text }: ErrorInputProps) => {
  return <div className={style.errorMessage}>{text}</div>;
};

export { ErrorInput };
