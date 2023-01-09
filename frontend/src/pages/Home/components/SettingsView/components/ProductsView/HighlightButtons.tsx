import {
  settingsViewKey,
  SETTINGS_VIEW_TEXT_DATA,
} from "../../../../../../constants";
import style from "./ShowUpdateProduct.module.css";

const textData = SETTINGS_VIEW_TEXT_DATA;

type HighlightButtonsProps = {
  handlerHighlightAll: () => void;
  handlerUnHighlightAll: () => void;
};

const HighlightButtons = ({
  handlerHighlightAll,
  handlerUnHighlightAll,
}: HighlightButtonsProps) => {
  return (
    <div className={style.highlightButtonsContent}>
      <div className={style.highlightBtn} onClick={handlerHighlightAll}>
        {textData[settingsViewKey.HIGHLIGHT_ALL_TEXT]}
      </div>
      <div className={style.highlightBtn} onClick={handlerUnHighlightAll}>
        {textData[settingsViewKey.UNHIGHLIGHT_ALL_TEXT]}
      </div>
    </div>
  );
};

export { HighlightButtons };
