import { Navigate, Outlet, useLocation } from "react-router-dom";
import { contentManager } from "../../../../router";
import { MenuButton } from "../MenuButton";
import style from "./Manager.module.css";

type ManagerProps = {};

const Manager = (props: ManagerProps) => {
  const pathname = useLocation().pathname;

  if (pathname === "/") {
    return <Navigate to={"/orders"} replace={true} />;
  }

  return (
    <div className={style.managerPage}>
      <div className={style.navBar}>
        {contentManager.map((obj, idex) => {
          return <MenuButton key={idex} btnName={obj.nameBtn} />;
        })}
      </div>
      <Outlet />
      {/* <div className={style.outLet}>
        <Outlet />
      </div> */}
    </div>
  );
};

export { Manager };
