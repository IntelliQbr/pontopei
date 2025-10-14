import { SchoolsApi } from "@/api/schools.api";
import { DataPagination } from "@/components/shared/DataPagination";
import { CreateSchoolDialog } from "./CreateSchoolDialog";
import { SchoolCard } from "./SchoolCard";

interface SchoolCardsProps {
	query: string;
	page: number;
}

export async function SchoolCards({ query, page }: SchoolCardsProps) {
	const take = 12;
	const skip = page ? (page - 1) * take : 0;
	const { schools, total } = await SchoolsApi.findAllSchoolsToDirector({
		skip,
		take,
		search: query,
	});

	return (
		<div>
			{total === 0 && (
				<div className="flex flex-col items-center justify-center h-full gap-4 mt-10">
					<p className="text-sm text-muted-foreground">
						Nenhuma escola encontrada.
					</p>
					<CreateSchoolDialog />
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 mt-4">
				{schools.map((school) => (
					<SchoolCard key={school.id} school={school} />
				))}
			</div>
			{total > take && (
				<DataPagination
					totalPages={Math.ceil(total / take)}
					pageParamName="page_schools"
				/>
			)}
		</div>
	);
}
