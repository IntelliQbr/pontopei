import { AdminSchoolsApi } from "@/api/admin-schools.api";
import { SchoolsApi } from "@/api/schools.api";
import { DataSelectFilter } from "@/components/shared/DataSelectFilter";
import { Label } from "@/components/ui/label";
import { School } from "@/models/interfaces/school/school.interface";
import { transformDataToSelectData } from "@/utils/transforms";
import { SchoolIcon } from "lucide-react";

interface StudentsSchoolFilterProps {
	schoolId?: string;
	directorId?: string;
	isAdmin?: boolean;
}

export async function StudentsSchoolFilter({
	schoolId,
	directorId,
	isAdmin = false,
}: StudentsSchoolFilterProps) {
	let schools: School[] = [];

	if (isAdmin) {
		if (directorId) {
			const { schools: schoolsByDirector } =
				await AdminSchoolsApi.findAllByDirectorId(directorId, {
					take: 100,
					skip: 0,
				});

			schools = schoolsByDirector;
		} else {
			const { schools: allSchools } = await AdminSchoolsApi.findAll({
				take: 100,
				skip: 0,
			});

			schools = allSchools;
		}
	} else {
		const { schools: schoolsToDirector } =
			await SchoolsApi.findAllSchoolsToDirector({
				skip: 0,
				take: 100,
			});

		schools = schoolsToDirector;
	}

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex justify-center items-center gap-2 bg-primary text-background p-2 rounded-t-lg">
				<SchoolIcon className="w-4 h-4" />
				<Label>Escola</Label>
			</div>
			<DataSelectFilter
				filterName="schoolId"
				placeholder="Filtre por escola"
				data={transformDataToSelectData<School>(schools, "name", "id")}
				defaultValue={schoolId}
			/>
		</div>
	);
}
