import { CustomBtn } from "../../../../components";
import { TOKEN_KEY } from "../../../../constants";
import style from "./FunctionalPanel.module.css";

type FunctionalPanelProps = {
  handlerRegisterNewUser: () => void;
};

// {Array.from(new Array(5), (v, i) => (
//     <option key={i} value={year + i}>
//       {year + i}
//     </option>
//   ))}

const FunctionalPanel = ({ handlerRegisterNewUser }: FunctionalPanelProps) => {
  const year = new Date().getFullYear();

  const logOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload();
  };

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
        <CustomBtn
          btnName="Register New User"
          handlerOnClick={handlerRegisterNewUser}
          additionalStyles={style.activeBtn}
        />
        <CustomBtn
          btnName="Change password"
          additionalStyles={style.activeBtn}
        />
        <CustomBtn
          btnName="Login Out"
          additionalStyles={style.activeBtn}
          handlerOnClick={logOut}
        />
      </div>
    </div>
  );
};

export { FunctionalPanel };
