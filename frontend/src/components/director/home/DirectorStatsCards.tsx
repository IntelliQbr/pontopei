import { directorStats } from "@/data/director.data";
import { StatCard } from "../../dashboard/home/StatCard";

export async function DirectorStatsCards() {
	const stats = await directorStats();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
			{stats.map((stat, index) => (
				<StatCard key={index} {...stat} />
			))}
		</div>
	);
}
