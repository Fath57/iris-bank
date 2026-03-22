import useAuthStore from "@/store/authStore";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import DashboardAside from "@/components/dashboard/DashboardAside";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col gap-4 p-6">
      <StatsCards />
      <div className="grid grid-cols-5 gap-10 pt-10">
        <div className="col-span-3">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl text-foreground font-bold tracking-tight">Dernières transactions</h2>
            </div>
            <Button className="cursor-pointer p-4">
              Voir tout
            </Button>
          </div>
            <RecentTransactions />
          </div>
          <div className="col-span-2">
            <DashboardAside />
          </div>
      </div>
    </div>
  );
}