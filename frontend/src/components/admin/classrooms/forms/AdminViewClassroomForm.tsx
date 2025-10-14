"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { classPeriodsLabels } from "@/data/classroom.data";
import { Classroom } from "@/models/interfaces/classroom/classroom.interface";
import { getProgressValue } from "@/utils/math";
import { format } from "date-fns";
import { CalendarIcon, SchoolIcon, UserIcon, UsersIcon } from "lucide-react"; // Adaptar ícones

interface AdminViewClassroomFormProps {
	classroom: Classroom;
	onClose: () => void;
}

export function AdminViewClassroomForm({
	classroom,
	onClose,
}: AdminViewClassroomFormProps) {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<SchoolIcon className="size-4" />
						</div>
						<span className="font-semibold">Nome</span>
					</div>
					<p className="text-sm">{classroom.name}</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<UsersIcon className="size-4" />
						</div>
						<span className="font-semibold">Série</span>
					</div>
					<p className="text-sm">{classroom.grade}</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<CalendarIcon className="size-4" />
						</div>
						<span className="font-semibold">Período</span>
					</div>
					<p className="text-sm">
						{classPeriodsLabels[classroom.period]}
					</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<UsersIcon className="size-4" />
						</div>
						<span className="font-semibold">Capacidade</span>
					</div>
					<p className="text-sm">
						<div className="flex items-center gap-2">
							<span>
								{classroom.assignments?.length || 0}/
								{classroom.capacity || "Não definida"}
							</span>
							<Progress
								className="max-w-[200px]"
								value={getProgressValue(
									classroom.assignments?.length || 0,
									classroom.capacity || 0
								)}
							/>
						</div>
					</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<SchoolIcon className="size-4" />
						</div>
						<span className="font-semibold">Escola</span>
					</div>
					<p className="text-sm">
						{classroom.school?.name || "Sem escola"}
					</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<UserIcon className="size-4" />
						</div>
						<span className="font-semibold">Criado por</span>
					</div>
					<p className="text-sm">
						{classroom.createdBy?.user?.fullName || "Sem criador"}
					</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<CalendarIcon className="size-4" />
						</div>
						<span className="font-semibold">Criada em</span>
					</div>
					<p className="text-sm">
						{classroom.createdAt
							? format(
									new Date(classroom.createdAt),
									"dd/MM/yyyy HH:mm"
							  )
							: "-"}
					</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<CalendarIcon className="size-4" />
						</div>
						<span className="font-semibold">Atualizada em</span>
					</div>
					<p className="text-sm">
						{classroom.updatedAt
							? format(
									new Date(classroom.updatedAt),
									"dd/MM/yyyy HH:mm"
							  )
							: "-"}
					</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<UsersIcon className="size-4" />
						</div>
						<span className="font-semibold">Alunos</span>
					</div>
					<div className="text-sm flex gap-2 flex-wrap">
						{classroom?.assignments &&
						classroom.assignments.length > 0 ? (
							classroom.assignments.map((assignment) => (
								<span key={assignment.id}>
									{assignment.student.fullName},
								</span>
							))
						) : (
							<span>Nenhum aluno</span>
						)}
					</div>
				</div>
			</div>
			<div className="flex justify-end pt-4">
				<Button onClick={onClose} variant="outline">
					Fechar
				</Button>
			</div>
		</div>
	);
}
