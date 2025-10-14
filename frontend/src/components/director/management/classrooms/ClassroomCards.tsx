import { ClassroomsApi } from "@/api/classrooms.api";
import { DataPagination } from "@/components/shared/DataPagination";
import { ClassroomCard } from "./ClassroomCard";
import { CreateClassroomDialog } from "./CreateClassroomDialog";

interface ClassroomCardsProps {
	query: string;
	page: number;
}

export async function ClassroomCards({ query, page }: ClassroomCardsProps) {
	const take = 12;
	const skip = page ? (page - 1) * take : 0;
	const { classrooms, total } =
		await ClassroomsApi.findAllClassroomsToDirector({
			skip,
			take,
			search: query,
		});

	return (
		<div>
			{total === 0 && (
				<div className="flex flex-col items-center justify-center h-full gap-4 mt-10">
					<p className="text-sm text-muted-foreground">
						Nenhuma sala de aula encontrada.
					</p>
					<CreateClassroomDialog />
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 mt-4">
				{classrooms.map((classroom) => (
					<ClassroomCard key={classroom.id} classroom={classroom} />
				))}
			</div>
			{total > take && (
				<DataPagination
					totalPages={Math.ceil(total / take)}
					pageParamName="page_classrooms"
				/>
			)}
		</div>
	);
}
