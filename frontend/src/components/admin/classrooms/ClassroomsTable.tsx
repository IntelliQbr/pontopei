import { AdminClassroomsApi } from "@/api/admin-classrooms.api";
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
import { classPeriodsLabels } from "@/data/classroom.data";
import { Classroom } from "@/models/interfaces/classroom/classroom.interface";
import { format } from "date-fns";
import { ShapesIcon, UserRoundXIcon } from "lucide-react";
import { AdminClassroomActions } from "./AdminClassroomActions";

interface ClassroomsTableProps {
	currentPage: number;
	search?: string;
	pageParamName: string;
}

export async function ClassroomsTable({
	currentPage,
	search,
	pageParamName,
}: ClassroomsTableProps) {
	const DEFAULT_TAKE = 10;
	const skip = currentPage === 1 ? 0 : (currentPage - 1) * DEFAULT_TAKE;

	const query = { skip, take: DEFAULT_TAKE, search };

	const { classrooms, total } = await AdminClassroomsApi.findAll(query);

	const totalPages = total !== 0 ? Math.ceil(total / DEFAULT_TAKE) : 0;
	const hasPagination = total > DEFAULT_TAKE;

	return (
		<div>
			<Table>
				<TableCaption className="w-full">
					{!classrooms ||
						(total < 1 && (
							<div className="w-full my-10 flex items-center justify-center gap-2 text-muted-foreground">
								<UserRoundXIcon className="w-4 h-4" />
								<span>Nenhuma sala de aula encontrada</span>
							</div>
						))}
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Nome</TableHead>
						<TableHead>Série</TableHead>
						<TableHead>Período</TableHead>
						<TableHead>Capacidade</TableHead>
						<TableHead>Escola</TableHead>
						<TableHead>Criada em</TableHead>
						<TableHead>Atualizada em</TableHead>
						<TableHead>Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{classrooms.map((classroom: Classroom) => (
						<TableRow key={classroom.id}>
							<TableCell className="flex items-center gap-2">
								<div className="flex justify-center items-center bg-primary text-background rounded-full p-2">
									<ShapesIcon className="size-4" />
								</div>
								<span className="max-w-[200px] truncate">
									{classroom.name}
								</span>
							</TableCell>
							<TableCell className="max-w-[200px] truncate">
								{classroom.grade}
							</TableCell>
							<TableCell>
								{classPeriodsLabels[classroom.period]}
							</TableCell>
							<TableCell>
								<Badge className="font-mono">
									{classroom.capacity || "Não definida"}
								</Badge>
							</TableCell>
							<TableCell className="max-w-[200px] truncate">
								{classroom.school?.name || "Sem escola"}
							</TableCell>
							<TableCell>
								{format(
									new Date(classroom.createdAt),
									"dd/MM/yyyy"
								)}
							</TableCell>
							<TableCell>
								{format(
									new Date(classroom.updatedAt),
									"dd/MM/yyyy"
								)}
							</TableCell>
							<TableCell>
								<AdminClassroomActions classroom={classroom} />
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
