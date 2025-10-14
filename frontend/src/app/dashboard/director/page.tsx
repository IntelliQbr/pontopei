import { DirectorLatestsPEIs } from "@/components/director/home/DirectorLatestsPEIs";
import { DirectorStatsCards } from "@/components/director/home/DirectorStatsCards";
import { LatestsPEIsSkeleton } from "@/components/skeletons/LatestsPEIs.skeleton";
import { StatsCardsSkeleton } from "@/components/skeletons/StatsCards.skeleons";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, HomeIcon } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Dashboard - Direção",
};

export default function DirectorDashboardPage() {
	return (
		<div className="flex flex-col gap-5 items-center max-w-7xl w-full mx-auto my-10">
			<div className="flex items-center sm:flex-row flex-col-reverse sm:gap-2 gap-4 justify-between w-full">
				<DashboardTitle Icon={HomeIcon}>
					Dashboard - Direção
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
			<Suspense fallback={<StatsCardsSkeleton />}>
				<DirectorStatsCards />
			</Suspense>

			<Suspense fallback={<LatestsPEIsSkeleton />}>
				<DirectorLatestsPEIs />
			</Suspense>
		</div>
	);
}
