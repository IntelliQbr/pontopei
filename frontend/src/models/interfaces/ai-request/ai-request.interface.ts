import { AIRequestStatus } from "@/models/enums/ai-request/ai-request-status.enum";
import { AIRequestType } from "@/models/enums/ai-request/ai-request-type.enum";
import { User } from "../user/user.interface";

export interface AIRequest {
	id: string;
	type: AIRequestType;
	status: AIRequestStatus;
	createdAt: string;
	updatedAt: string;
	inputTokens: number;
	outputTokens: number;
	totalTokens: number;
	user: User;
	model: string;
}
