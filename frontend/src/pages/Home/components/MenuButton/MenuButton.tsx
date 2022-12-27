import { NavLink } from "react-router-dom";
import { GET_ORDERS, rebuildUrl } from "../../../../services";
import classNames from "classnames";
import style from "./MenuButton.module.css";
import { queryClient } from "../../../../queryClient";
import {
  ACTIVE_BTN_FILTER,
  filterBtnNameKeys,
  navMenuBtnNameKeys,
  TEXT_DATA,
} from "../../../../constants";

type MenuButtonProps = {
  btnName: string;
  setActiveBtnFilterName: (n: string) => void;
};

const MenuButton = ({ btnName, setActiveBtnFilterName }: MenuButtonProps) => {
  const handlerMenuButton = () => {
    if (btnName == TEXT_DATA[navMenuBtnNameKeys.ORDERS].name) {
      const activeBtnNameOrders = TEXT_DATA[filterBtnNameKeys.PENDING].name!;

      localStorage.setItem(ACTIVE_BTN_FILTER, activeBtnNameOrders);
      setActiveBtnFilterName(activeBtnNameOrders);
      queryClient.invalidateQueries([GET_ORDERS]);
    }

    if (btnName == TEXT_DATA[navMenuBtnNameKeys.ARCHIVE].name) {
      const activeBtnNameCompleted =
        TEXT_DATA[filterBtnNameKeys.COMPLETED].name!;

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
