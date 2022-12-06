import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./queryClient";
import { rootRouter } from "./router";

import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={rootRouter} />
    </QueryClientProvider>
  );
}

export default App;
