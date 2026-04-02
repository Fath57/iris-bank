import { Link } from "react-router-dom";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import DashboardAside from "@/components/dashboard/DashboardAside";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-4">
        {/* Recent transactions */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Dernières transactions</h2>
            <Link to="/transactions">
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </Link>
          </div>
          <RecentTransactions />
        </div>

        {/* Profile aside */}
        <div className="lg:col-span-2">
          <DashboardAside />
        </div>
      </div>
    </div>
  );
}
