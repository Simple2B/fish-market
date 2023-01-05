import { createBrowserRouter, Navigate } from "react-router-dom";
import { navMenuBtnNameKeys, NAV_MENU_BUTTONS } from "./constants";
import { AddProduct, ChangePassword, Home, Market } from "./pages";
import { Orders, OutOfStock, SettingsView } from "./pages/Home";
import {
  rebuildUrl,
  filterOptionsOrder,
  filterOptionsArchive,
} from "./services";

const settingUrl = rebuildUrl(
  NAV_MENU_BUTTONS[navMenuBtnNameKeys.SETTINGS].name
);

export const contentManager = [
  {
    nameBtn: NAV_MENU_BUTTONS[navMenuBtnNameKeys.ORDERS].name,
    outLet: <Orders filterOptions={filterOptionsOrder} isArchive={false} />,
  },
  {
    nameBtn: NAV_MENU_BUTTONS[navMenuBtnNameKeys.ARCHIVE].name,
    outLet: <Orders filterOptions={filterOptionsArchive} isArchive={true} />,
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
      const path_url = rebuildUrl(obj.nameBtn);

      return {
        path: path_url,
        element: obj.outLet,
      };
    }),
  },
  {
    path: "market/:marketId",
    element: <Market />,
  },
  {
    path: settingUrl + "/change-password",
    element: <ChangePassword />,
  },
  {
    path: settingUrl + "/add-product",
    element: <AddProduct />,
  },
]);
