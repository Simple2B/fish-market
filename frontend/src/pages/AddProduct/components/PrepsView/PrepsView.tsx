import style from "./PrepsView.module.css";
import { IPrep } from "../../../../main.type";
import {
  settingsViewKey,
  SETTINGS_VIEW_TEXT_DATA,
} from "../../../../constants";

const textData = SETTINGS_VIEW_TEXT_DATA;

type PrepsViewProps = {
  preps: IPrep[];
};

const PrepsView = ({ preps }: PrepsViewProps) => {
  return (
    <div className={style.prepsViewContent}>
      <div className={style.prepsViewContentWrap}>
        <div>{textData[settingsViewKey.PREPS_TITLE]}</div>
        {preps.length > 1 ? (
          <h1>hi</h1>
        ) : (
          <div className={style.noPrepsText}>
            {textData[settingsViewKey.NO_PREPS_TEXT]}
          </div>
        )}
      </div>
    </div>
  );
};

export { PrepsView };
