import { CreateUserDialog } from "@/components/admin/users/CreateUserDialog";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { DataSearch } from "@/components/shared/DataSearch";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { GraduationCapIcon, ShieldUserIcon, UsersIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Admin - Usuários",
};

export default async function AdminUsersPage(params: {
	searchParams: Promise<{
		query_users: string;
		page_users: number;
	}>;
}) {
	const { query_users, page_users } = await params.searchParams;

	return (
		<div className="flex flex-col gap-5 items-center max-w-7xl w-full mx-auto my-10">
			<DashboardTitle Icon={UsersIcon}>Admin - Usuários</DashboardTitle>
			<Tabs defaultValue="all" className="w-full">
				<TabsList className="bg-background w-full h-12 shadow-sm">
					<TabsTrigger
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="all"
					>
						<UsersIcon className="w-4 h-4" />
						<span>Todos</span>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="directors"
					>
						<ShieldUserIcon className="w-4 h-4" />
						<span>Diretores</span>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="teachers"
					>
						<GraduationCapIcon className="w-4 h-4" />
						<span>Professores</span>
					</TabsTrigger>
				</TabsList>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm space-y-5"
					value="all"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar usuário..."
							queryParamName="query_users"
							pageParamName="page_users"
						/>
						<CreateUserDialog />
					</div>
					<UsersTable
						currentPage={page_users ?? 1}
						pageParamName="page_users"
						search={query_users}
					/>
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm space-y-5"
					value="directors"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar diretor..."
							queryParamName="query_directors"
							pageParamName="page_directors"
						/>
						<CreateUserDialog />
					</div>
					<UsersTable
						currentPage={page_users ?? 1}
						pageParamName="page_directors"
						search={query_users}
						role={ProfileRoleEnum.DIRECTOR}
					/>
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm space-y-5"
					value="teachers"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar professor..."
							queryParamName="query_teachers"
							pageParamName="page_teachers"
						/>
						<CreateUserDialog />
					</div>
					<UsersTable
						currentPage={page_users ?? 1}
						pageParamName="page_teachers"
						search={query_users}
						role={ProfileRoleEnum.TEACHER}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
