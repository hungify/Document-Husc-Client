import { getRole, isAuthenticated } from "app/selectors/auth";
import { fetchProfile } from "features/Profile/profileSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ redirectPath, allowedRoles }) {
  const location = useLocation();
  const isAuth = useSelector(isAuthenticated);
  const role = useSelector(getRole);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isAuth) {
      dispatch(fetchProfile());
    }
  }, [isAuth, dispatch]);

  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : isAuth ? (
    <Navigate to="unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
