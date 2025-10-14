import { AdminUsersApi } from "@/api/admin-users.api";
import { DataPagination } from "@/components/shared/DataPagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { planNames, planStatusColors } from "@/data/plans.data";
import { profileRoleLabels } from "@/data/profile.data";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { UserRoundXIcon } from "lucide-react";
import { UsersActions } from "./UsersActions";

interface UsersTableProps {
	currentPage: number;
	search?: string;
	pageParamName: string;
	role?: ProfileRoleEnum;
}

export async function UsersTable({
	currentPage,
	search,
	pageParamName,
	role,
}: UsersTableProps) {
	const DEFAULT_TAKE = 10;
	const skip = currentPage === 1 ? 0 : (currentPage - 1) * DEFAULT_TAKE;

	const { users, total } = await AdminUsersApi.findAll({
		skip,
		take: DEFAULT_TAKE,
		search,
		role,
	});

	const totalPages = total !== 0 ? Math.ceil(total / DEFAULT_TAKE) : 0;
	const hasPagination = total > DEFAULT_TAKE;

	return (
		<div>
			<Table>
				<TableCaption className="w-full">
					{!users ||
						(total < 1 && (
							<div className="w-full my-10 flex items-center justify-center gap-2 text-muted-foreground">
								<UserRoundXIcon className="w-4 h-4" />
								<span>Nenhum usuário encontrado</span>
							</div>
						))}
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Avatar</TableHead>
						<TableHead>Nome</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Função</TableHead>
						<TableHead>Plano</TableHead>
						<TableHead>Admin</TableHead>
						<TableHead>Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>
								<Avatar>
									<AvatarImage
										src={user.profile?.avatarUrl}
										alt={user.fullName}
									/>
									<AvatarFallback>
										{user.fullName.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							</TableCell>
							<TableCell>{user.fullName}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								{
									profileRoleLabels[
										user.profile?.role ?? "TEACHER"
									]
								}
							</TableCell>
							<TableCell>
								{user.profile?.subscription ? (
									<Badge
										className={
											planStatusColors[
												user.profile.subscription.status
											]
										}
									>
										{
											planNames[
												user.profile.subscription
													.planType
											]
										}
									</Badge>
								) : (
									<Badge className="bg-gray-500/10 text-gray-700">
										Sem plano
									</Badge>
								)}
							</TableCell>
							<TableCell>
								{user.isAdmin ? (
									<Badge className="bg-green-500/10 text-green-700">
										Sim
									</Badge>
								) : (
									<Badge className="bg-gray-500/10 text-gray-700">
										Não
									</Badge>
								)}
							</TableCell>
							<TableCell>
								<UsersActions user={user} />
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
