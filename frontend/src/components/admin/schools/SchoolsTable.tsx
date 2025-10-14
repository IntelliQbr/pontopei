import { AdminSchoolsApi } from "@/api/admin-schools.api"; // Assume created
import { DataPagination } from "@/components/shared/DataPagination";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { SchoolIcon, UserRoundXIcon } from "lucide-react";
import { AdminSchoolActions } from "./AdminSchoolActions";

interface SchoolsTableProps {
	currentPage: number;
	search?: string;
	pageParamName: string;
}

export async function SchoolsTable({
	currentPage,
	search,
	pageParamName,
}: SchoolsTableProps) {
	const DEFAULT_TAKE = 10;
	const skip = currentPage === 1 ? 0 : (currentPage - 1) * DEFAULT_TAKE;

	const query = { skip, take: DEFAULT_TAKE, search };

	const { schools, total } = await AdminSchoolsApi.findAll(query);

	const totalPages = total !== 0 ? Math.ceil(total / DEFAULT_TAKE) : 0;
	const hasPagination = total > DEFAULT_TAKE;

	return (
		<div>
			<Table>
				<TableCaption className="w-full">
					{!schools ||
						(total < 1 && (
							<div className="w-full my-10 flex items-center justify-center gap-2 text-muted-foreground">
								<UserRoundXIcon className="w-4 h-4" />
								<span>Nenhuma escola encontrada</span>
							</div>
						))}
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Nome</TableHead>
						<TableHead>Endereço</TableHead>
						<TableHead>Diretor</TableHead>
						<TableHead>Criada em</TableHead>
						<TableHead>Atualizada em</TableHead>
						<TableHead>Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{schools.map((school) => (
						<TableRow key={school.id}>
							<TableCell className="flex items-center gap-2">
								<div className="flex justify-center items-center bg-primary text-background rounded-full p-2">
									<SchoolIcon className="size-4" />
								</div>
								<span className="max-w-[200px] truncate">
									{school.name}
								</span>
							</TableCell>
							<TableCell className="max-w-[200px] truncate">
								{school.address}
							</TableCell>
							<TableCell>
								{school.createdBy?.user?.fullName ||
									"Sem diretor"}
							</TableCell>
							<TableCell>
								{format(
									new Date(school.createdAt),
									"dd/MM/yyyy"
								)}
							</TableCell>
							<TableCell>
								{format(
									new Date(school.updatedAt),
									"dd/MM/yyyy"
								)}
							</TableCell>
							<TableCell>
								<AdminSchoolActions school={school} />
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
