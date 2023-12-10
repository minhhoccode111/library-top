import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";

const Router: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
