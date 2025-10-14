import { Profile } from "../profile/profile.interface";

export interface School {
	id: string;
	name: string;
	address: string;
	createdBy: Profile;
	profiles: Profile[];
	createdById: string;
	createdAt: string;
	updatedAt: string;
}
