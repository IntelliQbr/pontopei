import { AdminSubscriptionsApi } from "@/api/admin-subscriptions.api";
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
	planNames,
	planStatusColors,
	planStatusLabels,
} from "@/data/plans.data";
import { SubscriptionStatusEnum } from "@/models/enums/subscription/subscription-status.enum";
import { formatCurrency } from "@/utils/formatters";
import { format } from "date-fns";
import { UserRoundXIcon } from "lucide-react";
import { SubscriptionsActions } from "../SubscriptionsActions";

interface SubscriptionsTableProps {
	currentPage: number;
	pageParamName: string;
	status?: SubscriptionStatusEnum;
	search?: string;
}

export async function SubscriptionsTable({
	currentPage,
	pageParamName,
	status,
	search,
}: SubscriptionsTableProps) {
	const DEFAULT_TAKE = 10;
	const skip = currentPage === 1 ? 0 : (currentPage - 1) * DEFAULT_TAKE;

	const { subscriptions, total } = await AdminSubscriptionsApi.findAll({
		skip,
		take: DEFAULT_TAKE,
		status,
		search,
	});

	const totalPages = total !== 0 ? Math.ceil(total / DEFAULT_TAKE) : 0;
	const hasPagination = total > DEFAULT_TAKE;

	return (
		<div>
			<Table>
				<TableCaption className="w-full">
					{!subscriptions ||
						(total < 1 && (
							<div className="w-full my-10 flex items-center justify-center gap-2 text-muted-foreground">
								<UserRoundXIcon className="w-4 h-4" />
								<span>Nenhuma assinatura encontrada</span>
							</div>
						))}
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Diretor</TableHead>
						<TableHead>Plano</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Data de início</TableHead>
						<TableHead>Data de término</TableHead>
						<TableHead>Preço (R$)</TableHead>
						<TableHead>Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{subscriptions.map((subscription) => {
						const director = subscription?.profiles?.find(
							(profile) => profile.role === "DIRECTOR"
						);

						return (
							<TableRow key={subscription.id}>
								<TableCell>
									{director
										? director?.user?.fullName
										: "Sem diretor"}
								</TableCell>
								<TableCell>
									{planNames[subscription.planType]}
								</TableCell>
								<TableCell>
									<Badge
										className={
											planStatusColors[
												subscription.status
											]
										}
									>
										{planStatusLabels[subscription.status]}
									</Badge>
								</TableCell>
								<TableCell>
									{subscription.startDate
										? format(
												new Date(
													subscription.startDate
												),
												"dd/MM/yyyy"
										  )
										: "-"}
								</TableCell>
								<TableCell>
									{subscription.endDate
										? format(
												new Date(subscription.endDate),
												"dd/MM/yyyy"
										  )
										: "-"}
								</TableCell>
								<TableCell>
									{formatCurrency(subscription.price)}
								</TableCell>
								<TableCell>
									<SubscriptionsActions
										subscription={subscription}
										directorId={director?.id}
									/>
								</TableCell>
							</TableRow>
						);
					})}
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
