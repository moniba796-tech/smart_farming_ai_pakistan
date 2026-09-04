import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import type { UserRole } from "@/types";

interface Props {
  children: React.ReactNode;
  requireRole?: UserRole;
}

/** Redirects to /login if not authenticated, or to / if the role doesn't match. */
export default function ProtectedRoute({ children, requireRole }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner label="Checking your session..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
