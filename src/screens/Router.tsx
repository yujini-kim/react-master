import { createBrowserRouter } from "react-router-dom";

import Root from "../Root";
import About from "./About";
import Home from "./Home";
import Notfound from "./Notfound";
import ErrorComponent from "../components/ErrorComponent";
import User from "./user/User";
import Followers from "./Followers";
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
        path: "users/:userId",
        element: <User />,
        children: [
          {
            path: "follwers",
            element: <Followers />,
          },
        ],
      },
    ],
    errorElement: <Notfound />,
  },
]);
export default router;
