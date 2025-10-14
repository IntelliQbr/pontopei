import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";

export const profileRoleLabels: Record<ProfileRoleEnum, string> = {
	[ProfileRoleEnum.DIRECTOR]: "Diretor",
	[ProfileRoleEnum.TEACHER]: "Professor",
};
