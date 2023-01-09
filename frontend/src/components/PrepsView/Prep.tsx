import classNames from "classnames";
import style from "./Prep.module.css";

type PrepProps = {
  id: number;
  name: string;
  is_active: boolean;
  handlerOnClick: (id: number) => void;
  handlerDelete: (id: number) => void;
};

const Prep = ({
  id,
  name,
  is_active,
  handlerOnClick,
  handlerDelete,
}: PrepProps) => {
  const prepContent = classNames(style.prepContent, {
    [style.activePrep]: is_active,
  });

  const handlerOnClickPrep = () => {
    handlerOnClick(id);
  };

  const handlerDeletePrep = () => {
    handlerDelete(id);
  };

  return (
    <div className={prepContent} onClick={handlerOnClickPrep}>
      <div>{name}</div>
      <div onClick={handlerDeletePrep}>✕</div>
    </div>
  );
};

export { Prep };
