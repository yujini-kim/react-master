import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Root from "../Root";
import About from "./About";
import Home from "./Home";
import Notfound from "./Notfound";
import ErrorComponent from "../components/ErrorComponent";
import User from "./user/User";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Home />, errorElement: <ErrorComponent /> },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "users/:useId",
        element: <User />,
      },
    ],
    errorElement: <Notfound />,
  },
]);
export default router;
