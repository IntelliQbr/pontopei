import { AdminStudentsCards } from "@/components/admin/students/AdminStudentsCards";
import { AdminStudentsFilter } from "@/components/admin/students/AdminStudentsFilter";
import { DataSearch } from "@/components/shared/DataSearch";
import { LoaderWithIcon } from "@/components/shared/LoaerWithIcon";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import { AdminStudentsSearchParams } from "@/models/types/params/admin-sutudents-search-params.type";
import { UsersRoundIcon } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Admin - Alunos",
};

export default async function AdminStudentsPage(params: {
	searchParams: Promise<AdminStudentsSearchParams>;
}) {
	const searchParams = await params.searchParams;

	return (
		<div className="flex flex-col gap-5 items-center max-w-7xl w-full mx-auto mb-10">
			<DashboardTitle Icon={UsersRoundIcon}>
				Admin - Alunos
			</DashboardTitle>
			<div className="bg-background w-full flex flex-col md:flex-row p-4 shadow-sm rounded-lg gap-10 flex-1 min-h-0">
				<AdminStudentsFilter searchParams={searchParams} />
				<div className="w-full flex flex-col flex-1 min-h-0">
					<DataSearch
						placeholder="Buscar aluno..."
						queryParamName="query_students"
						pageParamName="page_students"
						defaultValue={searchParams.query_students}
					/>
					<Suspense
						key={String(searchParams)}
						fallback={
							<LoaderWithIcon
								icon={<UsersRoundIcon />}
								className="m-auto"
							/>
						}
					>
						<AdminStudentsCards searchParams={searchParams} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
