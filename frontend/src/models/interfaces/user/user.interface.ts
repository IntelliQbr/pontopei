import { Profile } from "../profile/profile.interface";

export interface User {
	id: string;
	fullName: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	profile: Profile;
	isAdmin: boolean;
}
