import { DataSearch } from "@/components/shared/DataSearch";
import { LoaderWithIcon } from "@/components/shared/LoaerWithIcon";
import { CreateStudentDialog } from "@/components/students/pei/CreateStudentAndPEIDialog";
import { PreFormWarning } from "@/components/students/pei/forms/CreateStudentAndPEIPreFormAlert";
import { StudentAndPEIMoreOptionsMenu } from "@/components/students/pei/StudentAndPEIMoreOptionsMenu";
import { TeacherStudentsCards } from "@/components/teacher/students/TeacherStudentsCards";
import { TeacherStudentsFilter } from "@/components/teacher/students/TeacherStudentsFilter";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import { TeacherStudentsSearchParams } from "@/models/types/params/teacher-sutudents-search-params.type copy";
import { UsersRoundIcon } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Alunos - Professor",
};

export default async function StudentsPage(params: {
	searchParams: Promise<TeacherStudentsSearchParams>;
}) {
	const searchParams = await params.searchParams;

	return (
		<div className="flex flex-col gap-5 items-center max-w-7xl w-full mx-auto mb-10">
			<div className="flex sm:flex-row flex-col gap-4 items-center justify-between w-full">
				<DashboardTitle className="grow w-full" Icon={UsersRoundIcon}>
					Área - Alunos
				</DashboardTitle>
				<PreFormWarning />
			</div>
			<div className="bg-background w-full flex flex-col md:flex-row p-4 shadow-sm rounded-lg gap-10 flex-1 min-h-0">
				<TeacherStudentsFilter searchParams={searchParams} />
				<div className="w-full flex flex-col flex-1 min-h-0">
					<div className="flex items-center gap-2">
						<DataSearch
							placeholder="Buscar aluno..."
							queryParamName="query_students"
							pageParamName="page_students"
							defaultValue={searchParams.query_students}
						/>
						<div className="flex items-center gap-2">
							<CreateStudentDialog />
							<StudentAndPEIMoreOptionsMenu />
						</div>
					</div>

					<Suspense
						key={String(searchParams)}
						fallback={
							<LoaderWithIcon
								icon={<UsersRoundIcon />}
								className="m-auto"
							/>
						}
					>
						<TeacherStudentsCards searchParams={searchParams} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
