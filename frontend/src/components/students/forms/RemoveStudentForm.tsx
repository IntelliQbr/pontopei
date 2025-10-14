"use client";

import { AdminStudentsApi } from "@/api/admin-students.api";
import { StudentsApi } from "@/api/students.api";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { Student } from "@/models/interfaces/student/student.intertface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { AlertTriangleIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface RemoveStudentFormProps {
	student: Student;
	onSuccess: () => void;
	onCancel: () => void;
	isAdmin?: boolean;
}

export function RemoveStudentForm({
	student,
	onSuccess,
	onCancel,
	isAdmin = false,
}: RemoveStudentFormProps) {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	async function onSubmit() {
		setIsLoading(true);

		try {
			if (isAdmin) {
				await AdminStudentsApi.remove(student.id);
			} else {
				await StudentsApi.remove(student.id);
			}

			onSuccess();
			router.refresh();
			toast.success("Aluno removido com sucesso");
		} catch (error) {
			toast.error("Erro ao remover aluno", {
				description: getMessageFromAxiosError(error),
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="space-y-4">
			<div className="bg-destructive/10 p-1 rounded flex items-center gap-2">
				<AlertTriangleIcon className="text-destructive" />
				<p className="text-destructive text-sm">
					Ao confirmar a remoção, todos os dados do aluno serão
					permanentemente removidos.
				</p>
			</div>
			<div className="flex gap-2 justify-end">
				<Button onClick={onCancel} type="button" variant={"outline"}>
					Cancelar
				</Button>
				<SubmitButton
					onClick={onSubmit}
					size={"default"}
					className="h-9 w-24 bg-gradient-to-r from-red-400 to-red-600 hover:opacity-90"
					icon={<TrashIcon />}
					variant={"destructive"}
					isLoading={isLoading}
				>
					Remover
				</SubmitButton>
			</div>
		</div>
	);
}
