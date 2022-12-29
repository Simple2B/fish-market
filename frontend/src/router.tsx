import { createBrowserRouter, Navigate } from "react-router-dom";
import { navMenuBtnNameKeys, NAV_MENU_BUTTONS } from "./constants";
import { ChangePassword, Home, Market } from "./pages";
import { Orders, OutOfStock, SettingsView } from "./pages/Home";
import {
  rebuildUrl,
  filterOptionsOrder,
  filterOptionsArchive,
} from "./services";

export const contentManager = [
  {
    nameBtn: NAV_MENU_BUTTONS[navMenuBtnNameKeys.ORDERS].name,
    outLet: <Orders filterOptions={filterOptionsOrder} />,
  },
  {
    nameBtn: NAV_MENU_BUTTONS[navMenuBtnNameKeys.ARCHIVE].name,
    outLet: <Orders filterOptions={filterOptionsArchive} />,
  },
  {
    nameBtn: NAV_MENU_BUTTONS[navMenuBtnNameKeys.OUT_OF_STOCK].name,
    outLet: <OutOfStock />,
  },
  {
    nameBtn: NAV_MENU_BUTTONS[navMenuBtnNameKeys.SETTINGS].name,
    outLet: <SettingsView />,
  },
];

export const rootRouter = createBrowserRouter([
  { path: "*", element: <Navigate to="/" replace={true} /> },
  {
    path: "/",
    element: <Home />,
    children: contentManager.map((obj) => {
      return {
        path: rebuildUrl(obj.nameBtn),
        element: obj.outLet,
      };
    }),
  },
  {
    path: "market/:marketId",
    element: <Market />,
  },
  {
    path:
      rebuildUrl(NAV_MENU_BUTTONS[navMenuBtnNameKeys.SETTINGS].name) +
      "/change-password",
    element: <ChangePassword />,
  },
]);
