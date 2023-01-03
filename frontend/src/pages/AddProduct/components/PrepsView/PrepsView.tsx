import style from "./PrepsView.module.css";
import { IPrep } from "../../../../main.type";
import {
  settingsViewKey,
  SETTINGS_VIEW_TEXT_DATA,
} from "../../../../constants";
import { Prep } from "./Prep";

const textData = SETTINGS_VIEW_TEXT_DATA;

type PrepsViewProps = {
  preps: IPrep[];
  handlerOnClickPrep: (id: number) => void;
  handlerDeletePrep: (id: number) => void;
};

const PrepsView = ({
  preps,
  handlerOnClickPrep,
  handlerDeletePrep,
}: PrepsViewProps) => {
  return (
    <div className={style.prepsViewContent}>
      <div className={style.prepsViewContentWrap}>
        <div>{textData[settingsViewKey.PREPS_TITLE]}</div>
        {preps.length >= 1 ? (
          <div className={style.prepsList}>
            {preps.map((p) => (
              <Prep
                key={p.id}
                {...p}
                handlerOnClick={handlerOnClickPrep}
                handlerDelete={handlerDeletePrep}
              />
            ))}
          </div>
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
