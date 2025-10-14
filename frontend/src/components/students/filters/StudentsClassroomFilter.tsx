import { AdminClassroomsApi } from "@/api/admin-classrooms.api";
import { ClassroomsApi } from "@/api/classrooms.api";
import { DataSelectFilter } from "@/components/shared/DataSelectFilter";
import { Label } from "@/components/ui/label";
import { Classroom } from "@/models/interfaces/classroom/classroom.interface";
import { transformDataToSelectData } from "@/utils/transforms";
import { ShapesIcon } from "lucide-react";

interface StudentsClassroomFilterProps {
	classroomId?: string;
	directorId?: string;
	isAdmin?: boolean;
}

export async function StudentsClassroomFilter({
	classroomId,
	directorId,
	isAdmin,
}: StudentsClassroomFilterProps) {
	let classrooms: Classroom[] = [];

	if (isAdmin) {
		if (directorId) {
			const { classrooms: classroomsToDirector } =
				await AdminClassroomsApi.findAllByDirectorId(directorId, {
					take: 100,
					skip: 0,
				});

			classrooms = classroomsToDirector;
		} else {
			const { classrooms: allClassrooms } =
				await AdminClassroomsApi.findAll({
					take: 100,
					skip: 0,
				});

			classrooms = allClassrooms;
		}
	} else {
		const { classrooms: classroomsToDirector } =
			await ClassroomsApi.findAllClassroomsToDirector({
				skip: 0,
				take: 100,
			});

		classrooms = classroomsToDirector;
	}

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex justify-center items-center gap-2 bg-primary text-background p-2 rounded-t-lg">
				<ShapesIcon className="w-4 h-4" />
				<Label>Turma</Label>
			</div>
			<DataSelectFilter
				filterName="classroomId"
				placeholder="Filtre por turma"
				data={transformDataToSelectData<Classroom>(
					classrooms,
					"grade",
					"id"
				)}
				defaultValue={classroomId}
			/>
		</div>
	);
}
