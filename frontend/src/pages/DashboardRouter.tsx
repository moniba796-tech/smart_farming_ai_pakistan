import { useAuth } from "@/context/AuthContext";
import FarmerDashboard from "./FarmerDashboard";
import AdminDashboard from "./AdminDashboard";

/** /dashboard shows the right dashboard based on the logged-in user's role. */
export default function DashboardRouter() {
  const { user } = useAuth();
  if (user?.role === "admin") return <AdminDashboard />;
  return <FarmerDashboard />;
}
