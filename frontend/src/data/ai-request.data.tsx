import { AIRequestStatus } from "@/models/enums/ai-request/ai-request-status.enum";
import { AIRequestType } from "@/models/enums/ai-request/ai-request-type.enum";
import { CalendarIcon, FileText, RefreshCcwIcon } from "lucide-react";

export const aiRequestStatusLabels: Record<AIRequestStatus, string> = {
	[AIRequestStatus.PROCESSING]: "Em andamento",
	[AIRequestStatus.COMPLETED]: "Concluído",
	[AIRequestStatus.ERROR]: "Erro",
};

export const aiRequestStatusColors: Record<AIRequestStatus, string> = {
	[AIRequestStatus.PROCESSING]: "bg-yellow-500/10 text-yellow-600",
	[AIRequestStatus.COMPLETED]: "bg-green-500/10 text-green-700",
	[AIRequestStatus.ERROR]: "bg-red-500/10 text-red-700",
};

export const aiRequestTypeLabels: Record<AIRequestType, string> = {
	[AIRequestType.PEI_CREATION]: "Criação de PEI",
	[AIRequestType.PEI_RENEWAL]: "Renovação de PEI",
	[AIRequestType.WEEKLY_PLAN]: "Plano Semanal",
};

export const aiRequestTypeIcons: Record<AIRequestType, React.ReactNode> = {
	[AIRequestType.PEI_CREATION]: <FileText className="size-4" />,
	[AIRequestType.PEI_RENEWAL]: <RefreshCcwIcon className="size-4" />,
	[AIRequestType.WEEKLY_PLAN]: <CalendarIcon className="size-4" />,
};
