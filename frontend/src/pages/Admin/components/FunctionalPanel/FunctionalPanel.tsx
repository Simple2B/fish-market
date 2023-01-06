import { CustomBtn } from "../../../../components";
import style from "./FunctionalPanel.module.css";

type Props = {};

// {Array.from(new Array(5), (v, i) => (
//     <option key={i} value={year + i}>
//       {year + i}
//     </option>
//   ))}

const FunctionalPanel = (props: Props) => {
  const year = new Date().getFullYear();

  return (
    <div className={style.functionalPanelContent}>
      <div className={style.functionalPanelLeft}>
        <div>
          Year subjected
          <select
            className={style.functionalPanelSelect}
            placeholder="Choose option"
          ></select>
        </div>
        <div>
          Month subjected
          <select
            className={style.functionalPanelSelect}
            placeholder="Choose option"
          ></select>
        </div>
      </div>
      <div className={style.functionalPanelRight}>
        <CustomBtn btnName="Register New User" />
        <CustomBtn btnName="Change password" />
        <CustomBtn btnName="Login Out" />
      </div>
    </div>
  );
};

export { FunctionalPanel };
