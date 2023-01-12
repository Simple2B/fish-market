import style from "./Error.module.css";

const Error = ({ textError }: { textError: string }) => {
  return <div className={style.errorContent}>{textError}</div>;
};

export { Error };
