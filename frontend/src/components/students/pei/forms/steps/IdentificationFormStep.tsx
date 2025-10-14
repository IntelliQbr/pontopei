"use client";

import { ClassroomsApi } from "@/api/classrooms.api";
import { PrintButton } from "@/components/shared/PrintButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { studentGenderLabels } from "@/data/student.data";
import { StudentGender } from "@/models/enums/student/student-gender.enum";
import { Classroom } from "@/models/interfaces/classroom/classroom.interface";
import { generatePrintableForm } from "@/utils/forms";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import type { FormSectionProps } from "../create-student-and-pei-form.schema";

export function IdentificationFormStep({ form }: FormSectionProps) {
	const { data: classrooms } = useQuery({
		queryKey: ["classrooms"],
		queryFn: () =>
			ClassroomsApi.findAllClassroomsToDirector({ skip: 0, take: 100 }),
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "step1.medicalConditions",
	});

	return (
		<Card className="h-full max-h-96 sm:max-h-[calc(100vh-20rem)] overflow-y-auto">
			<CardHeader>
				<div className="flex justify-between items-start">
					<div>
						<CardTitle>Seção 1 - Identificação</CardTitle>
						<CardDescription>
							Informações básicas do aluno (preenchida pela
							escola)
						</CardDescription>
					</div>
					<PrintButton
						documentTitle="Formulário de Identificação do Aluno"
						PrintableElement={IdentificationFormStepPrintableForm}
					/>
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="step1.fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>
									Nome completo do aluno(a)
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
						name="step1.dateOfBirth"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>
									Data de Nascimento
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										onChange={(e) => {
											field.onChange(e.target.value);
										}}
										type="date"
										id="student.dateOfBirth"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="step1.classroomId"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Série / Turma</FormLabel>
								<FormControl>
									<Select
										disabled={field.disabled}
										value={field.value}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Turma" />
										</SelectTrigger>
										<SelectContent>
											{classrooms &&
												classrooms.classrooms.map(
													(classroom: Classroom) => (
														<SelectItem
															key={classroom.id}
															value={classroom.id}
														>
															{classroom.name} -{" "}
															{classroom.grade}
														</SelectItem>
													)
												)}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="step1.cid"
						render={({ field }) => (
							<FormItem>
								<FormLabel>CID (se houver)</FormLabel>
								<FormControl>
									<Input
										{...field}
										id="student.cid"
										placeholder="Ex: F84.0"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name={`step1.medicalConditions`}
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
							{fields.map((field, index) => (
								<div
									key={field.id}
									className="flex items-start gap-4 p-4 rounded-md shadow-sm border border-primary"
								>
									<div className="flex-1 space-y-2">
										<FormField
											control={form.control}
											name={`step1.medicalConditions.${index}.condition`}
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
											name={`step1.medicalConditions.${index}.age`}
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
										<Trash2 className="h-4 w-4 text-destructive " />
									</Button>
								</div>
							))}
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="step1.hasCamping"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>
									Aluno possui acompanhante ou mediador?
								</FormLabel>
								<FormControl>
									<RadioGroup
										disabled={field.disabled}
										value={String(field.value)}
										onValueChange={(value) =>
											field.onChange(JSON.parse(value))
										}
									>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="true"
												id="acomp-sim"
											/>
											<Label htmlFor="acomp-sim">
												Sim
											</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="false"
												id="acomp-nao"
											/>
											<Label htmlFor="acomp-nao">
												Não
											</Label>
										</div>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="step1.parentGuardian"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>
									Nome do(a) responsável legal
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Digite o nome do responsável"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="step1.gender"
						render={({ field }) => (
							<FormItem>
								<FormLabel required>Gênero</FormLabel>
								<FormControl>
									<Select
										disabled={field.disabled}
										value={field.value}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Gênero" />
										</SelectTrigger>
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
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="step1.specialNeeds"
						render={({ field }) => (
							<FormItem className="grow">
								<FormLabel required>
									Necessidades especiais
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Ex: Usa apoio para locomoção (cadeira de rodas, andador)"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex items-center gap-4">
						<Avatar className="sm:w-20 sm:h-20 w-12 h-12">
							<AvatarImage src={form.watch("step1.photoUrl")} />
							<AvatarFallback>
								{form
									.watch("step1.fullName")
									?.charAt(0)
									?.toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<FormField
							control={form.control}
							name="step1.photoUrl"
							render={({ field }) => (
								<FormItem className="grow">
									<FormLabel>Foto do Aluno (URL)</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="url"
											placeholder="Digite a URL da foto do aluno"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

const IdentificationFormStepPrintableForm = generatePrintableForm({
	title: "Seção 1 - Identificação",
	subtitle: "Informações básicas do aluno (preenchida pela escola)",
	sections: [
		{
			title: "Dados Pessoais",
			fields: [
				{
					id: "nome",
					type: "text",
					label: "Nome completo do aluno(a)",
					width: "full",
				},
				{
					id: "nascimento",
					type: "text",
					label: "Data de Nascimento",
					width: "full",
				},
				{
					id: "serie",
					type: "text",
					label: "Série / Turma",
					width: "full",
				},
				{
					id: "diagnostico",
					type: "text",
					label: "Diagnóstico (se houver)",
					width: "full",
				},
				{
					id: "cid",
					type: "text",
					label: "CID (se houver)",
					width: "full",
				},
				{
					id: "idade_diagnostico",
					type: "text",
					label: "Idade do diagnóstico (se houver)",
					width: "full",
				},
				{
					id: "possui-mediador",
					type: "radio",
					label: "Aluno possui acompanhante ou mediador?",
					width: "full",
					options: [
						{ value: "sim", label: "Sim" },
						{ value: "nao", label: "Não" },
					],
				},
				{
					id: "responsavel",
					type: "text",
					label: "Nome do(a) responsável legal",
					width: "full",
				},
				{
					id: "genero",
					type: "radio",
					label: "Gênero",
					width: "full",
					options: [
						{ value: "masculino", label: "Masculino" },
						{ value: "feminino", label: "Feminino" },
					],
				},
				{
					id: "necessidades",
					type: "text",
					label: "Necessidades especiais",
					width: "full",
				},
			],
		},
	],
});
