import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import Login from "../features/auth/UI/Login";
import Register from "../features/auth/UI/Register";
import AuthLayout from "../layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
