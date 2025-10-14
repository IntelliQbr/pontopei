"use client";

import { AdminClassroomsApi } from "@/api/admin-classrooms.api";
import { AdminSchoolsApi } from "@/api/admin-schools.api"; // Assumindo que existe
import { AdminUsersApi } from "@/api/admin-users.api";
import { SubmitButton } from "@/components/shared/SubmitButton";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { School } from "@/models/interfaces/school/school.interface";
import { User } from "@/models/interfaces/user/user.interface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createClassroomFormSchema = z.object({
	name: z.string().nonempty("Nome é obrigatório"),
	grade: z.string().nonempty("Série é obrigatória"),
	period: z.enum(["MORNING", "AFTERNOON", "EVENING"]),
	capacity: z.number().int().positive("Capacidade deve ser positiva"),
	schoolId: z.string().nonempty("Escola é obrigatória"),
	directorId: z.string().nonempty("Diretor é obrigatório"),
});

export type AdminCreateClassroomFormData = z.infer<
	typeof createClassroomFormSchema
>;

interface AdminCreateClassroomFormProps {
	onSuccess: () => void;
}

export function AdminCreateClassroomForm({
	onSuccess,
}: AdminCreateClassroomFormProps) {
	const form = useForm<AdminCreateClassroomFormData>({
		resolver: zodResolver(createClassroomFormSchema),
		defaultValues: {
			name: "",
			grade: "",
			period: "MORNING",
			capacity: 0,
			schoolId: "",
			directorId: "",
		},
	});

	const router = useRouter();

	async function onSubmit(data: AdminCreateClassroomFormData) {
		try {
			await AdminClassroomsApi.create(data);
			onSuccess();
			router.refresh();
			toast.success("Sala de aula criada com sucesso");
		} catch (error) {
			toast.error("Erro ao criar sala de aula", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

	const { data: schools, isPending: isLoadingSchools } = useQuery({
		queryKey: ["schools-create-classroom", form.watch("directorId")],
		queryFn: async () => {
			const directorId = form.watch("directorId");

			const data = await AdminSchoolsApi.findAllByDirectorId(directorId, {
				skip: 0,
				take: 1000,
			});
			return data.schools;
		},
		enabled: !!form.watch("directorId"),
	});

	const { data: directors, isPending: isLoadingDirectors } = useQuery({
		queryKey: ["directors-create-classroom"],
		queryFn: async () => {
			const data = await AdminUsersApi.findAll({
				role: ProfileRoleEnum.DIRECTOR,
				skip: 0,
				take: 1000,
			});
			return data.users;
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Nome</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>
									Nome da sala de aula.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="grade"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Série</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>
									Série da sala de aula.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="period"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Período</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o período" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="MORNING">
											Manhã
										</SelectItem>
										<SelectItem value="AFTERNOON">
											Tarde
										</SelectItem>
										<SelectItem value="EVENING">
											Noite
										</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>
									Período da sala de aula.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="capacity"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Capacidade</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) =>
											field.onChange(
												parseInt(e.target.value)
											)
										}
									/>
								</FormControl>
								<FormDescription>
									Capacidade máxima de alunos.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="directorId"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Diretor</FormLabel>
								<Select
									disabled={
										field.disabled || isLoadingDirectors
									}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione um diretor" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{isLoadingDirectors ? (
											<SelectItem
												value="loading"
												disabled
											>
												Carregando...
											</SelectItem>
										) : (
											directors &&
											directors.map((director: User) => (
												<SelectItem
													key={director?.profile?.id}
													value={
														director?.profile?.id ||
														""
													}
												>
													{director.fullName}
												</SelectItem>
											))
										)}
									</SelectContent>
								</Select>
								<FormDescription>
									Diretor responsável.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="schoolId"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Escola</FormLabel>
								<Select
									disabled={
										field.disabled || isLoadingSchools
									}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione uma escola" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{isLoadingSchools ? (
											<SelectItem
												value="loading"
												disabled
											>
												Carregando...
											</SelectItem>
										) : (
											schools &&
											schools.map((school: School) => (
												<SelectItem
													key={school.id}
													value={school.id}
												>
													{school.name}
												</SelectItem>
											))
										)}
									</SelectContent>
								</Select>
								<FormDescription>
									Escola à qual a sala pertence.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex justify-center">
					<SubmitButton
						className="h-10 m-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
						icon={<PlusIcon />}
						isLoading={form.formState.isSubmitting}
					>
						Criar Sala de Aula
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
}
