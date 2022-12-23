import { NavLink } from "react-router-dom";
import { rebuildUrl } from "../../../../services";
import classNames from "classnames";
import style from "./MenuButton.module.css";

type MenuButtonProps = {
  btnName: string;
};

const MenuButton = ({ btnName }: MenuButtonProps) => {
  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) =>
    classNames([
      style.menuButtonContent,
      { [style.menuButtonContentActive]: isActive },
    ]);

  return (
    <NavLink className={getNavLinkStyle} to={`${rebuildUrl(btnName)}`}>
      {btnName}
    </NavLink>
  );
};

export { MenuButton };
