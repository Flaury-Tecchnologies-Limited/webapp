import { useEffect, useState } from "react";
import Overview from "@/components/dashboard/Overview";
import BOverview from "@/components/dashboard/BOverview";
import { useAuth } from "@/context/AuthContext";

const DashboardMain = () => {
  const { user, isLoading } = useAuth();

  // Use role from the auth context as the single source of truth.
  // Initialize as null to indicate "not yet known".
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.role) {
      setRole(user.role);
    }
  }, [user]);

  // While auth is loading and we don't yet know the role, show a loader.
  if (isLoading && role === null) {
    return (
      <div className="flex h-screen items-center justify-center text-primary">
        Loading dashboard...
      </div>
    );
  }

  return role === "service_provider" ? <BOverview /> : <Overview />;
};

export default DashboardMain;

