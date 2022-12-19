import { NavLink } from "react-router-dom";
import { rebuildUrl } from "../../../../services";
import classNames from "classnames";
import style from "./MenuButton.module.css";

type MenuButtonProps = {
  btnName: string;
};

const MenuButton = ({ btnName }: MenuButtonProps) => {
  const styleBtnActive = classNames(
    style.menuButtonContent,
    style.menuButtonContentActive
  );

  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? styleBtnActive : style.menuButtonContent
      }
      to={`${rebuildUrl(btnName)}`}
    >
      {btnName}
    </NavLink>
  );
};

export { MenuButton };
