import { LatestNotesSkeleton } from "@/components/skeletons/LatestNotes.skeleton";
import { LatestsPEIsSkeleton } from "@/components/skeletons/LatestsPEIs.skeleton";
import { StatsCardsSkeleton } from "@/components/skeletons/StatsCards.skeleons";
import { TeacherLatestsNotes } from "@/components/teacher/home/TeacherLatestsNotes";
import { TeacherLatestsPEIs } from "@/components/teacher/home/TeacherLatestsPEIs";
import { TeacherStatsCards } from "@/components/teacher/home/TeacherStatsCards";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, HomeIcon } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Dashboard - Professor",
};

export default function TeacherDashboardPage() {
	return (
		<div className="flex flex-col gap-5 items-center max-w-7xl w-full mx-auto my-10">
			<div className="flex items-center sm:flex-row flex-col-reverse sm:gap-2 gap-4 justify-between w-full">
				<DashboardTitle Icon={HomeIcon}>
					Dashboard - Professor
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
				<TeacherStatsCards />
			</Suspense>

			<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				<Suspense fallback={<LatestNotesSkeleton />}>
					<TeacherLatestsNotes />
				</Suspense>
				<Suspense fallback={<LatestsPEIsSkeleton />}>
					<TeacherLatestsPEIs />
				</Suspense>
			</div>
		</div>
	);
}
