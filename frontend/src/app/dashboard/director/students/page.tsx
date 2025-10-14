import { DirectorStudentsCards } from "@/components/director/students/DirectorStudentsCards";
import { DirectorStudentsFilter } from "@/components/director/students/DirectorStudentsFilter";
import { DataSearch } from "@/components/shared/DataSearch";
import { LoaderWithIcon } from "@/components/shared/LoaerWithIcon";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import { DirectorStudentsSearchParams } from "@/models/types/params/director-sutudents-search-params.type";
import { UsersRoundIcon } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Alunos - Direção",
};

export default async function StudentsPage(params: {
	searchParams: Promise<DirectorStudentsSearchParams>;
}) {
	const searchParams = await params.searchParams;

	return (
		<div className="flex flex-col gap-5 items-center max-w-7xl w-full mx-auto mb-10">
			<DashboardTitle Icon={UsersRoundIcon}>Área - Alunos</DashboardTitle>
			<div className="bg-background w-full flex flex-col md:flex-row p-4 shadow-sm rounded-lg gap-10 flex-1 min-h-0">
				<DirectorStudentsFilter searchParams={searchParams} />
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
						<DirectorStudentsCards searchParams={searchParams} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
