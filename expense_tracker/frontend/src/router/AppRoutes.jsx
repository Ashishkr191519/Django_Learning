import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import Login from "../features/auth/UI/Login";
import Register from "../features/auth/UI/Register";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../features/expenses/UI/Dashboard";
import Transaction from "../features/expenses/UI/Transaction";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AddTransaction from "../features/expenses/UI/AddTransaction";
import Analytics from "../features/expenses/UI/Analytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        path: "",
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
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "transactions",
            element: <Transaction />,
          },
          {
            path: "add",
            element: <AddTransaction />,
          },
          {
            path:"analytics",
            element:<Analytics/>
          }
        ],
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
