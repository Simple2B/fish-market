import { useForm } from "react-hook-form";
import {
  changePasswordKeys,
  CHANGE_PASSWORD_INPUT_DATA,
  settingsViewKey,
  SETTINGS_VIEW_TEXT_DATA,
} from "../../constants";
import style from "./AddPrepForm.module.css";

type FormInputs = {
  prep: string;
};

type AddPrepFormProps = {
  handlerAddPreps: (data: FormInputs) => void;
};

const placeholder = CHANGE_PASSWORD_INPUT_DATA[changePasswordKeys.PLACEHOLDER];
const textData = SETTINGS_VIEW_TEXT_DATA;

const AddPrepForm = ({ handlerAddPreps }: AddPrepFormProps) => {
  const { register, handleSubmit, setValue } = useForm<FormInputs>();

  const handlerOnSubmit = (data: FormInputs) => {
    handlerAddPreps(data);
    setValue("prep", "");
  };

  return (
    <form
      onSubmit={handleSubmit(handlerOnSubmit)}
      className={style.addPrepFormContent}
    >
      <div>{textData[settingsViewKey.ADD_PREP_TITLE]}</div>
      <input
        type="text"
        className={style.inputPrep}
        {...register("prep", { required: true })}
        placeholder={placeholder}
      />
      <button className={style.submitBtn} type="submit">
        {textData[settingsViewKey.ADD]}
      </button>
    </form>
  );
};

export { AddPrepForm };
