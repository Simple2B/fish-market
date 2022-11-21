import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home, Market } from "./pages";

export const rootRouter = createBrowserRouter([
  { path: "*", element: <Navigate to="/" replace={true} /> },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "market/:marketId",
    element: <Market />,
  },
]);
