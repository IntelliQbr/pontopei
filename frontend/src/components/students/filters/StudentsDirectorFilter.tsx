import { AdminUsersApi } from "@/api/admin-users.api";
import { DataSelectFilter } from "@/components/shared/DataSelectFilter";
import { Label } from "@/components/ui/label";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { User } from "@/models/interfaces/user/user.interface";
import { transformDataToSelectData } from "@/utils/transforms";
import { ShieldUserIcon } from "lucide-react";

interface StudentsDirectorFilterProps {
	directorId?: string;
}

export async function StudentsDirectorFilter({
	directorId,
}: StudentsDirectorFilterProps) {
	const { users } = await AdminUsersApi.findAll({
		role: ProfileRoleEnum.DIRECTOR,
		take: 100,
		skip: 0,
	});

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex justify-center items-center gap-2 bg-primary text-background p-2 rounded-t-lg">
				<ShieldUserIcon className="w-4 h-4" />
				<Label>Diretor</Label>
			</div>
			<DataSelectFilter
				filterName="directorId"
				placeholder="Filtre por diretor"
				data={transformDataToSelectData<User>(
					users,
					"fullName",
					"profile.id"
				)}
				defaultValue={directorId}
			/>
		</div>
	);
}
