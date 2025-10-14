"use client";

import { AdminClassroomsApi } from "@/api/admin-classrooms.api";
import { AdminStudentsApi } from "@/api/admin-students.api";
import { AdminTeachersApi } from "@/api/admin-teachers.api";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { PenIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { AdminUsersApi } from "@/api/admin-users.api";
import { Button } from "@/components/ui/button";
import { studentGenderLabels } from "@/data/student.data";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { StudentGender } from "@/models/enums/student/student-gender.enum";
import { Classroom } from "@/models/interfaces/classroom/classroom.interface";
import { Student } from "@/models/interfaces/student/student.intertface";
import { User } from "@/models/interfaces/user/user.interface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { useRouter } from "next/navigation";

const medicalConditionSchema = z.object({
	condition: z.string().nonempty("Diagnóstico obrigatório"),
	age: z.string().optional(),
});

const adminEditStudentFormSchema = z.object({
	fullName: z.string().nonempty("Nome é obrigatório"),
	photoUrl: z
		.string()
		.url("URL inválida")
		.optional()
		.or(z.literal("").transform(() => undefined)),
	gender: z.nativeEnum(StudentGender, { message: "Selecione o gênero" }),
	dateOfBirth: z.string().nonempty("Data de nascimento obrigatória"),
	specialNeeds: z.string().nonempty("Necessidades especiais obrigatórias"),
	medicalConditions: z.array(medicalConditionSchema).optional(),
	hasCamping: z.boolean(),
	parentGuardian: z.string().nonempty("Nome do responsável obrigatório"),
	cid: z.string().optional(),
	classroomId: z.string().nonempty("Turma obrigatória"),
	teacherId: z.string().nonempty("Professor obrigatório"),
	directorId: z.string().nonempty("Diretor obrigatório"),
});

export type AdminEditStudentFormData = z.infer<
	typeof adminEditStudentFormSchema
>;

interface AdminEditStudentFormProps {
	student: Student;
	onSuccess: () => void;
}

export function AdminEditStudentForm({
	student,
	onSuccess,
}: AdminEditStudentFormProps) {
	const form = useForm<AdminEditStudentFormData>({
		resolver: zodResolver(adminEditStudentFormSchema),
		defaultValues: {
			fullName: student.fullName,
			photoUrl: student.photoUrl || "",
			gender: student.gender,
			dateOfBirth: student.dateOfBirth?.slice(0, 10) || "",
			specialNeeds: student.specialNeeds || "",
			medicalConditions:
				student.medicalConditions?.map((mc) => ({
					condition: mc.condition,
					age: mc.age || "",
				})) || [],
			hasCamping: student.hasCamping || false,
			parentGuardian: student.parentGuardian || "",
			cid: student.cid || "",
			classroomId: student.classroomAssignment?.classroomId || "",
			teacherId: student.classroomAssignment?.teacherId || "",
			directorId:
				student.classroomAssignment?.classroom.createdById || "",
		},
	});

	// Buscar diretores
	const { data: directors, isLoading: isLoadingDirectors } = useQuery({
		queryKey: ["directors"],
		queryFn: async () => {
			const { users } = await AdminUsersApi.findAll({
				role: ProfileRoleEnum.DIRECTOR,
			});

			return users;
		},
	});

	// Buscar professores
	const { data: teachers, isLoading: isLoadingTeachers } = useQuery({
		queryKey: ["teachers", form.watch("directorId")],
		queryFn: async () => {
			const { teachers } = await AdminTeachersApi.findAllByDirectorId(
				form.watch("directorId"),
				{
					skip: 0,
					take: 1000,
				}
			);
			return teachers;
		},
		enabled: !!form.watch("directorId"),
	});

	// Buscar turmas
	const { data: classrooms, isLoading: isLoadingClassrooms } = useQuery({
		queryKey: ["classrooms", form.watch("directorId")],
		queryFn: async () => {
			const { classrooms } = await AdminClassroomsApi.findAllByDirectorId(
				form.watch("directorId"),
				{
					skip: 0,
					take: 1000,
				}
			);
			return classrooms;
		},
		enabled: !!form.watch("directorId"),
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "medicalConditions",
	});

	const reouter = useRouter();

	async function onSubmit(data: AdminEditStudentFormData) {
		try {
			await AdminStudentsApi.update(student.id, data);
			onSuccess();
			reouter.refresh();
			toast.success("Estudante editado com sucesso");
		} catch (error) {
			toast.error("Erro ao editar estudante", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Nome</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>
									Nome completo do estudante.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="photoUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Foto (URL)</FormLabel>
								<div className="flex gap-4 items-center">
									<FormControl>
										<Input
											placeholder="Url da imagem..."
											{...field}
										/>
									</FormControl>
									<Avatar className="w-10 h-10">
										<AvatarImage
											src={
												form.watch("photoUrl") ||
												`https://avatar.vercel.sh/${form.watch(
													"fullName"
												)}`
											}
										/>
										<AvatarFallback>
											{form.watch("fullName").charAt(0)}
										</AvatarFallback>
									</Avatar>
								</div>
								<FormDescription>
									Avatar do estudante.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="gender"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Gênero</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione o gênero" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{Object.values(StudentGender).map(
											(gender) => (
												<SelectItem
													key={gender}
													value={gender}
												>
													{
														studentGenderLabels[
															gender
														]
													}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="dateOfBirth"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>
									Data de Nascimento
								</FormLabel>
								<FormControl>
									<Input type="date" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="specialNeeds"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>
									Necessidades Especiais
								</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="parentGuardian"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Responsável</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="cid"
						render={({ field }) => (
							<FormItem>
								<FormLabel>CID</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="hasCamping"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center space-x-3 space-y-0">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormLabel className="mb-0">
									Possui Acompanhante?
								</FormLabel>
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
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione o diretor" />
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
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="classroomId"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Turma</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione a turma" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{isLoadingClassrooms ? (
											<SelectItem
												value="loading"
												disabled
											>
												Carregando...
											</SelectItem>
										) : (
											classrooms &&
											classrooms.map(
												(classroom: Classroom) => (
													<SelectItem
														key={classroom.id}
														value={classroom.id}
													>
														{classroom.name} -{" "}
														{classroom.grade}
													</SelectItem>
												)
											)
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="teacherId"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Professor</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione o professor" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{isLoadingTeachers ? (
											<SelectItem
												value="loading"
												disabled
											>
												Carregando...
											</SelectItem>
										) : (
											teachers &&
											teachers.map((teacher: User) => (
												<SelectItem
													key={teacher?.profile?.id}
													value={
														teacher?.profile?.id ||
														""
													}
												>
													{teacher.fullName}
												</SelectItem>
											))
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name={`medicalConditions`}
					render={({ field }) => (
						<FormItem>
							<div className="flex flex-col items-start justify-between gap-4">
								<FormLabel>Diagnósticos (se houver)</FormLabel>
								<Button
									disabled={field.disabled}
									type="button"
									size="sm"
									onClick={() =>
										append({
											condition: "",
											age: "",
										})
									}
								>
									<PlusIcon />
									<span>Adicionar Diagnóstico</span>
								</Button>
							</div>
							<div className="max-h-[200px] overflow-y-auto space-y-2">
								{fields.map((field, index) => (
									<div
										key={field.id}
										className="flex items-start gap-4 p-4 rounded-md shadow-sm border border-primary"
									>
										<div className="flex-1 space-y-2">
											<FormField
												control={form.control}
												name={`medicalConditions.${index}.condition`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Diagnóstico
														</FormLabel>
														<FormControl>
															<Input
																{...field}
																placeholder="Ex: Autismo, TDAH, etc."
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name={`medicalConditions.${index}.age`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Idade (Diagnóstico)
														</FormLabel>
														<FormControl>
															<Input
																{...field}
																placeholder="Idade do diagnóstico"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<Button
											disabled={form.formState.disabled}
											type="button"
											variant="ghost"
											size="icon"
											className="bg-destructive/10"
											onClick={() => remove(index)}
										>
											<Trash2Icon className="h-4 w-4 text-destructive " />
										</Button>
									</div>
								))}
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-center">
					<SubmitButton
						className="h-10 m-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
						icon={<PenIcon />}
						isLoading={form.formState.isSubmitting}
					>
						Editar Estudante
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
}
