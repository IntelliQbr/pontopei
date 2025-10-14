import { AdminTeachersApi } from "@/api/admin-teachers.api";
import { AdminUsersApi } from "@/api/admin-users.api";
import { TeachersApi } from "@/api/teachers.api";
import { DataSelectFilter } from "@/components/shared/DataSelectFilter";
import { Label } from "@/components/ui/label";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { User } from "@/models/interfaces/user/user.interface";
import { transformDataToSelectData } from "@/utils/transforms";
import { GraduationCapIcon } from "lucide-react";

interface StudentsTeacherFilterProps {
	teacherId?: string;
	directorId?: string;
	isAdmin?: boolean;
}

export async function StudentsTeacherFilter({
	teacherId,
	directorId,
	isAdmin = false,
}: StudentsTeacherFilterProps) {
	let teachers: User[] = [];

	if (isAdmin) {
		if (directorId) {
			const { teachers: teachersByDirector } =
				await AdminTeachersApi.findAllByDirectorId(directorId, {
					take: 100,
					skip: 0,
				});

			teachers = teachersByDirector;
		} else {
			const { users } = await AdminUsersApi.findAll({
				take: 100,
				role: ProfileRoleEnum.TEACHER,
				skip: 0,
			});

			teachers = users;
		}
	} else {
		const { teachers: teachersToDirector } =
			await TeachersApi.findAllTeachersToDirector({
				skip: 0,
				take: 100,
			});
		teachers = teachersToDirector;
	}

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex justify-center items-center gap-2 bg-primary text-background p-2 rounded-t-lg">
				<GraduationCapIcon className="w-4 h-4" />
				<Label>Professor(a)</Label>
			</div>
			<DataSelectFilter
				filterName="teacherId"
				placeholder="Filtre por professor"
				data={transformDataToSelectData<User>(
					teachers,
					"fullName",
					"profile.id"
				)}
				defaultValue={teacherId}
			/>
		</div>
	);
}
