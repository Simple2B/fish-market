import { NavLink } from "react-router-dom";
import { GET_ORDERS, rebuildUrl } from "../../../../services";
import classNames from "classnames";
import style from "./MenuButton.module.css";
import { queryClient } from "../../../../queryClient";
import {
  ACTIVE_BTN_FILTER,
  filterBtnNameKeys,
  navMenuBtnNameKeys,
  NAV_MENU_BUTTONS,
  FILTER_BUTTONS,
} from "../../../../constants";

type MenuButtonProps = {
  btnName: string;
};

const MenuButton = ({ btnName }: MenuButtonProps) => {
  const handlerMenuButton = () => {
    if (btnName == NAV_MENU_BUTTONS[navMenuBtnNameKeys.ORDERS].name) {
      queryClient.invalidateQueries([GET_ORDERS, false]);
    }

    if (btnName == NAV_MENU_BUTTONS[navMenuBtnNameKeys.ARCHIVE].name) {
      queryClient.invalidateQueries([GET_ORDERS, true]);
    }
  };

  const getNavLinkStyle = (state: any) =>
    classNames([
      style.menuButtonContent,
      { [style.menuButtonContentActive]: state.isActive },
    ]);

  return (
    <NavLink
      className={getNavLinkStyle}
      to={`${rebuildUrl(btnName)}`}
      onClick={handlerMenuButton}
    >
      {btnName}
    </NavLink>
  );
};

export { MenuButton };
