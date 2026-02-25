import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const PublicLayout = lazy(() => import("../layout/PublicLayout"));
const PrivateLayout = lazy(() => import("../layout/PrivateLayout"));
const RootLayout = lazy(() => import("../layout/RootLayout"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "auth",
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <AuthPage />,
          },
        ],
      },
      {
        path: "/",
        element: <PrivateLayout />,
      },
    ],
  },
]);

export default router;
