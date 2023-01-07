import { useOutletContext } from "react-router-dom";
import { CustomBtn } from "../../../../components";
import { ManagerOutletContextAdmin } from "../../../../main.type";
import style from "./RegisterNewUser.module.css";

const RegisterNewUser = () => {
  const { handlerRegisterNewUser } =
    useOutletContext<ManagerOutletContextAdmin>();

  return (
    <div className={style.registerNewUserContent}>
      <div>Register New User</div>
      <form className={style.registerNewUserForm}>
        <div className={style.registerNewUserFormWrap}>
          <div className={style.formLabel}>User type </div>
          <div className={style.formLabel}>Business name</div>
          <div className={style.formLabel}>Business address</div>
          <div className={style.formLabel}>Business phone number</div>
          <hr />
          <div className={style.formLabel}>Representative name</div>
          <div className={style.formLabel}>Representative phone number</div>
          <hr />
          <div className={style.formLabel}>Email (Used for login)</div>
          <div className={style.formLabel}>Password</div>
        </div>
        <div className={style.registerNewUserFormWrap}>
          <input className={style.formInput} placeholder="Type here" />
          <input className={style.formInput} placeholder="Type here" />
          <input className={style.formInput} placeholder="Type here" />
          <input className={style.formInput} placeholder="Type here" />
          <hr />
          <input className={style.formInput} placeholder="Type here" />
          <input className={style.formInput} placeholder="Type here" />
          <hr />
          <input className={style.formInput} placeholder="Type here" />
          <input className={style.formInput} placeholder="Type here" />
        </div>
      </form>
      <div className={style.contentButtons}>
        <CustomBtn btnName="Confirm" handlerOnClick={() => {}} />
        <CustomBtn btnName="Cancel" handlerOnClick={handlerRegisterNewUser} />
      </div>
    </div>
  );
};

export { RegisterNewUser };
