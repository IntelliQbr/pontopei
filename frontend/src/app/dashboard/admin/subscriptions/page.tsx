import { CreatePlusSubscriptionDialog } from "@/components/admin/subscriptions/CreatePlusSubscriptionDialog";
import { SubscriptionsTable } from "@/components/admin/subscriptions/forms/SubscriptionsTable";
import { DataSearch } from "@/components/shared/DataSearch";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionStatusEnum } from "@/models/enums/subscription/subscription-status.enum";
import {
	CheckCircleIcon,
	ClockFadingIcon,
	ClockIcon,
	CreditCardIcon,
	XCircleIcon,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Admin - Assinaturas",
};

export default async function AdminUsersPage(params: {
	searchParams: Promise<{
		page_subscriptions: number;
		search_subscriptions: string;
	}>;
}) {
	const { page_subscriptions, search_subscriptions } =
		await params.searchParams;

	return (
		<div className="flex flex-col gap-5 items-center max-w-7xl w-full mx-auto my-10">
			<DashboardTitle Icon={CreditCardIcon}>
				Admin - Assinaturas
			</DashboardTitle>
			<Tabs defaultValue="all" className="w-full">
				<TabsList className="bg-background w-full sm:h-12 h-auto shadow-sm grid sm:grid-cols-5 grid-cols-1">
					<TabsTrigger
						className="flex items-center justify-start sm:justify-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="all"
					>
						<CreditCardIcon className="w-4 h-4" />
						<span>Todas</span>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center justify-start sm:justify-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="active"
					>
						<CheckCircleIcon className="w-4 h-4" />
						<span>Ativas</span>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center justify-start sm:justify-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="pending"
					>
						<ClockFadingIcon className="w-4 h-4" />
						<span>Pendentes</span>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center justify-start sm:justify-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="expired"
					>
						<ClockIcon className="w-4 h-4" />
						<span>Expiradas</span>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center justify-start sm:justify-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="cancelled"
					>
						<XCircleIcon className="w-4 h-4" />
						<span>Canceladas</span>
					</TabsTrigger>
				</TabsList>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm space-y-5"
					value="all"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar assinatura por nome ou email..."
							queryParamName="search_subscriptions"
							pageParamName="page_subscriptions"
						/>
						<CreatePlusSubscriptionDialog />
					</div>
					<SubscriptionsTable
						currentPage={page_subscriptions ?? 1}
						pageParamName="page_subscriptions"
						search={search_subscriptions}
					/>
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm space-y-5"
					value="active"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar assinatura por nome ou email..."
							queryParamName="search_subscriptions"
							pageParamName="page_subscriptions"
						/>
					</div>
					<SubscriptionsTable
						currentPage={page_subscriptions ?? 1}
						pageParamName="page_subscriptions"
						search={search_subscriptions}
						status={SubscriptionStatusEnum.ACTIVE}
					/>
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm space-y-5"
					value="pending"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar assinatura por nome ou email..."
							queryParamName="search_subscriptions"
							pageParamName="page_subscriptions"
						/>
					</div>
					<SubscriptionsTable
						currentPage={page_subscriptions ?? 1}
						pageParamName="page_subscriptions"
						search={search_subscriptions}
						status={SubscriptionStatusEnum.PENDING}
					/>
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm space-y-5"
					value="expired"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar assinatura por nome ou email..."
							queryParamName="search_subscriptions"
							pageParamName="page_subscriptions"
						/>
					</div>
					<SubscriptionsTable
						currentPage={page_subscriptions ?? 1}
						pageParamName="page_subscriptions"
						search={search_subscriptions}
						status={SubscriptionStatusEnum.EXPIRED}
					/>
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm space-y-5"
					value="cancelled"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar assinatura por nome ou email..."
							queryParamName="search_subscriptions"
							pageParamName="page_subscriptions"
						/>
					</div>
					<SubscriptionsTable
						currentPage={page_subscriptions ?? 1}
						pageParamName="page_subscriptions"
						search={search_subscriptions}
						status={SubscriptionStatusEnum.CANCELLED}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
