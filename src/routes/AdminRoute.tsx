import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const role = localStorage.getItem("role");
  return role === "ADMIN" ? <>{children}</> : <Navigate to="/login" />;
}
