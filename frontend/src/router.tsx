import { createBrowserRouter, Navigate } from "react-router-dom";
import { navMenuBtnNameKeys, TEXT_DATA } from "./constants";
import { Home, Market } from "./pages";
import { Orders, OutOfStock } from "./pages/Home";
import {
  rebuildUrl,
  filterOptionsOrder,
  filterOptionsArchive,
} from "./services";

export const contentManager = [
  {
    nameBtn: TEXT_DATA[navMenuBtnNameKeys.ORDERS].name!,
    outLet: <Orders filterOptions={filterOptionsOrder} />,
  },
  {
    nameBtn: TEXT_DATA[navMenuBtnNameKeys.ARCHIVE].name!,
    outLet: <Orders filterOptions={filterOptionsArchive} />,
  },
  {
    nameBtn: TEXT_DATA[navMenuBtnNameKeys.OUT_OF_STOCK].name!,
    outLet: <OutOfStock />,
  },
  {
    nameBtn: TEXT_DATA[navMenuBtnNameKeys.SETTINGS].name!,
    outLet: <h1>settings</h1>,
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
]);
