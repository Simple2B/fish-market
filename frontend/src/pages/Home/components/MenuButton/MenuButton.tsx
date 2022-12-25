import { NavLink } from "react-router-dom";
import { GET_ORDERS, rebuildUrl } from "../../../../services";
import classNames from "classnames";
import style from "./MenuButton.module.css";
import { queryClient } from "../../../../queryClient";
import {
  filterBtnNameKeys,
  navMenuBtnNameKeys,
  TEXT_DATA,
} from "../../../../constants";

type MenuButtonProps = {
  btnName: string;
  setActiveBtn: (n: string) => void;
};

const MenuButton = ({ btnName, setActiveBtn }: MenuButtonProps) => {
  const handlerMenuButton = () => {
    if (btnName == TEXT_DATA[navMenuBtnNameKeys.ORDERS].name) {
      setActiveBtn(TEXT_DATA[filterBtnNameKeys.PENDING].name!);
      queryClient.invalidateQueries([GET_ORDERS]);
    }

    if (btnName == TEXT_DATA[navMenuBtnNameKeys.ARCHIVE].name) {
      setActiveBtn(TEXT_DATA[filterBtnNameKeys.COMPLETED].name!);
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
