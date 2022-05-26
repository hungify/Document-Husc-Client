import { getRole, isAuthenticated } from "app/selectors/auth";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ redirectPath, allowedRoles }) {
  const location = useLocation();
  const isAuth = useSelector(isAuthenticated);
  const role = useSelector(getRole);

  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : isAuth ? (
    <Navigate to="unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
