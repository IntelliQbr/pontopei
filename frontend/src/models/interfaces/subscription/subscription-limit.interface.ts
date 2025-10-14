export interface SubscriptionLimit {
	id: string;
	maxStudents: number;
	maxPeiPerTrimester: number;
	maxWeeklyPlans: number;
	createdAt: Date;
	updatedAt: Date;
	subscriptionId: string;
}
