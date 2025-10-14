import { AdminStudentsApi } from "@/api/admin-students.api";
import { DataPagination } from "@/components/shared/DataPagination";
import { StudentCard } from "@/components/students/StudentCard";
import { AdminStudentsSearchParams } from "@/models/types/params/admin-sutudents-search-params.type";

interface AdminStudentsCardsProps {
	searchParams: AdminStudentsSearchParams;
}

export async function AdminStudentsCards({
	searchParams,
}: AdminStudentsCardsProps) {
	const page = searchParams.page_students ?? 1;

	const take = 12;
	const skip = page ? (page - 1) * take : 0;
	const { students, total } = await AdminStudentsApi.findAll({
		skip,
		take,
		search: searchParams.query_students ?? "",
		...searchParams,
	});

	return (
		<div className="flex flex-col md:flex-1 md:min-h-0">
			{total === 0 && (
				<div className="flex flex-col items-center justify-center h-full gap-4 mt-10">
					<p className="text-sm text-muted-foreground">
						Nenhum aluno encontrado.
					</p>
				</div>
			)}
			<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mt-4 md:overflow-y-auto md:flex-1 items-start md:pr-2">
				{students.map((student) => (
					<StudentCard
						key={student.id}
						student={student}
						actionPath={`/dashboard/admin/students/${student.id}`}
						isAdmin={true}
					/>
				))}
			</div>
			{total > take && (
				<DataPagination
					totalPages={Math.ceil(total / take)}
					pageParamName="page_students"
				/>
			)}
		</div>
	);
}
