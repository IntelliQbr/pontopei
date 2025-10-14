import { SubscriptionPlanEnum } from "@/models/enums/subscription/subscription-plan.enum";
import { SubscriptionStatusEnum } from "@/models/enums/subscription/subscription-status.enum";
import { Profile } from "../profile/profile.interface";
import { SubscriptionFeature } from "./subscription-features.interface";
import { SubscriptionLimit } from "./subscription-limit.interface";

export interface Subscription {
	id: string;
	price: number;
	planType: SubscriptionPlanEnum;
	status: SubscriptionStatusEnum;
	startDate?: Date;
	endDate?: Date;
	features: SubscriptionFeature;
	externalId?: string;
	createdAt: Date;
	updatedAt: Date;
	profiles?: Profile[];
	limits: SubscriptionLimit;
}
