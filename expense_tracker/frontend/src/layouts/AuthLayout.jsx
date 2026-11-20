import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#0c1321]">
      <Outlet />
    </div>
  );
};

export default AuthLayout;