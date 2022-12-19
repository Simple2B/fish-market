import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home, Market } from "./pages";
import { rebuildUrl } from "./services";

export const contentManager = [
  {
    nameBtn: "Orders",
    outLet: <h1>orders</h1>,
  },
  {
    nameBtn: "Out of stock",
    outLet: <h1>out of stock</h1>,
  },
  {
    nameBtn: "Archive",
    outLet: <h1>archive</h1>,
  },
  {
    nameBtn: "Settings",
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
