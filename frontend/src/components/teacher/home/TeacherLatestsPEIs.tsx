import { PeiApi } from "@/api/pei.api";
import { SmallStudentPEICard } from "@/components/dashboard/home/SmallStudentPEICard";
import { DashboardTitleH2 } from "@/components/typography/DashboardTitleH2";
import { FileText } from "lucide-react";

export async function TeacherLatestsPEIs() {
	const peis = await PeiApi.getLatestsPEIsToTeacher();

	return (
		<div className="bg-background shadow-sm rounded-lg p-4 w-full">
			<DashboardTitleH2 Icon={FileText} className="text-lg font-semibold">
				PEIs Recentes
			</DashboardTitleH2>

			{peis.length === 0 && (
				<div className="h-96 flex justify-center items-center text-muted-foreground">
					Os ultimos PEIs cadastrados serão exibidos aqui.
				</div>
			)}

			{peis.map((pei) => (
				<SmallStudentPEICard key={pei.id} pei={pei} />
			))}
		</div>
	);
}
