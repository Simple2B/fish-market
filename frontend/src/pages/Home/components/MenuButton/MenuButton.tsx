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
  setActiveBtnFilterName: (n: string) => void;
};

const MenuButton = ({ btnName, setActiveBtnFilterName }: MenuButtonProps) => {
  const handlerMenuButton = () => {
    if (btnName == NAV_MENU_BUTTONS[navMenuBtnNameKeys.ORDERS].name) {
      const activeBtnNameOrders =
        FILTER_BUTTONS[filterBtnNameKeys.PENDING].name;

      localStorage.setItem(ACTIVE_BTN_FILTER, activeBtnNameOrders);
      setActiveBtnFilterName(activeBtnNameOrders);
      queryClient.invalidateQueries([GET_ORDERS]);
    }

    if (btnName == NAV_MENU_BUTTONS[navMenuBtnNameKeys.ARCHIVE].name) {
      const activeBtnNameCompleted =
        FILTER_BUTTONS[filterBtnNameKeys.COMPLETED].name;

      localStorage.setItem(ACTIVE_BTN_FILTER, activeBtnNameCompleted);
      setActiveBtnFilterName(activeBtnNameCompleted);
      queryClient.invalidateQueries([GET_ORDERS]);
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
