import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  // TODO: Add user observation state
  const currentUser = true;
  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
