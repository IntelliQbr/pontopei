import { AdminMetricsApi } from "@/api/admin-metrics.api";
import { SmallProfileCard } from "@/components/dashboard/home/SmallProfileCard";
import { DashboardTitleH2 } from "@/components/typography/DashboardTitleH2";
import { Profile } from "@/models/interfaces/profile/profile.interface";
import { FileTextIcon } from "lucide-react";

export async function AdminLastUsers() {
	const profiles = await AdminMetricsApi.getLastProfiles();

	return (
		<div className="bg-background shadow-sm rounded-lg p-4 w-full">
			<DashboardTitleH2 Icon={FileTextIcon}>
				Ultimos Cadastros
			</DashboardTitleH2>

			{profiles.length === 0 && (
				<div className="h-96 flex justify-center items-center text-muted-foreground">
					Os ultimos cadastros serão exibidos aqui.
				</div>
			)}

			{profiles.map((profile: Profile) => (
				<SmallProfileCard key={profile.id} profile={profile} />
			))}
		</div>
	);
}
