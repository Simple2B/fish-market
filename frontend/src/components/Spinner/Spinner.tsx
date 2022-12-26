import style from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={style.spinner}>
      <div className={style.loadingSpinner}>
        <div className={style.loadingSpinnerWrap}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export { Spinner };
