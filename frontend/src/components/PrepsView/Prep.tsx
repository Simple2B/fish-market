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

  return (
    <div className={prepContent} onClick={() => handlerOnClick(id)}>
      <div>{name}</div>
      <div onClick={() => handlerDelete(id)}>✕</div>
    </div>
  );
};

export { Prep };
