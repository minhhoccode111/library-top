import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { action as rootAction } from "./root";
import ErrorPage from "./error-page";
import Add from "./add";
import DefaultPage, {
  loader as defaultLoader,
  action as defaultAction,
} from "./default-page";

const Router: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      action: rootAction,
      children: [
        {
          index: true,
          element: <DefaultPage />,
          loader: defaultLoader,
          action: defaultAction,
        },
        {
          path: "add",
          element: <Add />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
