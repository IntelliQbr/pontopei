import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { School } from "../school/school.interface";
import { Subscription } from "../subscription/subscription.interface";
import { User } from "../user/user.interface";

export interface Profile {
    id: string;
    userId: string;
    role: ProfileRoleEnum;
    subscriptionId?: string;
    schoolId?: string;
    createdById?: string;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    subscription?: Subscription;
    school?: School;
    user: User;
}
