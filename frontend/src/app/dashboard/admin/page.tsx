import { AdminLastUsers } from "@/components/admin/home/AdminLastUsers";
import { AdminStatsCards } from "@/components/admin/home/AdminStatsCards";
import { SubscriptionsChart } from "@/components/admin/home/SubscriptionsChart";
import { LatestsPEIsSkeleton } from "@/components/skeletons/LatestsPEIs.skeleton";
import { StatsCardsSkeleton } from "@/components/skeletons/StatsCards.skeleons";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import { DashboardTitleH2 } from "@/components/typography/DashboardTitleH2";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BarChart, CalendarIcon, ShieldCheckIcon } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Dashboard - Admin",
};

export default function AdminPage() {
	return (
		<div className="flex flex-col gap-5 items-center max-w-7xl w-full mx-auto my-10">
			<div className="flex items-center sm:flex-row flex-col-reverse sm:gap-2 gap-4 justify-between w-full">
				<DashboardTitle Icon={ShieldCheckIcon}>
					Dashboard - Admin
				</DashboardTitle>
				<div className="flex items-center gap-2">
					<CalendarIcon className="w-4 h-4 text-primary" />
					<span className="text-sm text-muted-foreground">
						{format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", {
							locale: ptBR,
						})}
					</span>
				</div>
			</div>
			<Suspense
				fallback={
					<>
						<StatsCardsSkeleton />
						<StatsCardsSkeleton />
					</>
				}
			>
				<AdminStatsCards />
			</Suspense>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
				<div className="w-full bg-background shadow-sm rounded-lg p-4 space-y-4">
					<DashboardTitleH2 Icon={BarChart}>
						Assinaturas (Últimos 12 meses)
					</DashboardTitleH2>
					<SubscriptionsChart />
				</div>
				<Suspense fallback={<LatestsPEIsSkeleton />}>
					<AdminLastUsers />
				</Suspense>
			</div>
		</div>
	);
}
