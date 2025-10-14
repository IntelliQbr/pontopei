import { AdminAiRequestsApi } from "@/api/admin-ai-requests.api";
import { DataPagination } from "@/components/shared/DataPagination";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	aiRequestStatusColors,
	aiRequestStatusLabels,
	aiRequestTypeIcons,
	aiRequestTypeLabels,
} from "@/data/ai-request.data";
import { AIRequest } from "@/models/interfaces/ai-request/ai-request.interface";
import { format } from "date-fns";
import { UserRoundXIcon } from "lucide-react";

interface AiRequestsTableProps {
	currentPage: number;
	search?: string;
	pageParamName: string;
}

export async function AiRequestsTable({
	currentPage,
	search,
	pageParamName,
}: AiRequestsTableProps) {
	const DEFAULT_TAKE = 10;
	const skip = currentPage === 1 ? 0 : (currentPage - 1) * DEFAULT_TAKE;

	const query = { skip, take: DEFAULT_TAKE, search };

	const { aiRequests, total } = await AdminAiRequestsApi.findAll(query);

	const totalPages = total !== 0 ? Math.ceil(total / DEFAULT_TAKE) : 0;
	const hasPagination = total > DEFAULT_TAKE;

	return (
		<div>
			<Table>
				<TableCaption className="w-full">
					{!aiRequests ||
						(total < 1 && (
							<div className="w-full my-10 flex items-center justify-center gap-2 text-muted-foreground">
								<UserRoundXIcon className="w-4 h-4" />
								<span>
									Nenhuma solicitação de AI encontrada
								</span>
							</div>
						))}
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Tipo</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Usuário</TableHead>
						<TableHead>Input/Output</TableHead>
						<TableHead>Total</TableHead>
						<TableHead>Modelo</TableHead>
						<TableHead>Criada em</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{aiRequests.map((aiRequest: AIRequest) => (
						<TableRow key={aiRequest.id}>
							<TableCell className="flex items-center gap-2">
								<div className="flex justify-center items-center bg-primary text-background rounded-full p-2">
									{aiRequestTypeIcons[aiRequest.type]}
								</div>
								<span>
									{aiRequestTypeLabels[aiRequest.type]}
								</span>
							</TableCell>
							<TableCell>
								<Badge
									className={
										aiRequestStatusColors[aiRequest.status]
									}
								>
									{aiRequestStatusLabels[aiRequest.status]}
								</Badge>
							</TableCell>
							<TableCell className="max-w-[200px] truncate">
								{aiRequest.user.fullName}
							</TableCell>

							<TableCell>
								<Badge className="font-mono">
									{aiRequest.inputTokens} /{" "}
									{aiRequest.outputTokens} Tokens
								</Badge>
							</TableCell>
							<TableCell>
								<Badge className="font-mono">
									{aiRequest.totalTokens} Tokens
								</Badge>
							</TableCell>
							<TableCell>
								<Badge
									variant={"secondary"}
									className="font-mono"
								>
									{aiRequest.model}
								</Badge>
							</TableCell>
							<TableCell>
								{format(
									new Date(aiRequest.createdAt),
									"dd/MM/yyyy"
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{hasPagination && (
				<DataPagination
					className="mt-0 pt-5 border-t border-primary"
					pageParamName={pageParamName}
					totalPages={totalPages}
				/>
			)}
		</div>
	);
}
