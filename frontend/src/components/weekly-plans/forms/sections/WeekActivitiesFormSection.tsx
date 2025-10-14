"use client";

import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { CreateWeeklyPlanFormProps } from "../create-weekly-plan-form.schema";

type DayOfWeek =
	| "mondayActivity"
	| "tuesdayActivity"
	| "wednesdayActivity"
	| "thursdayActivity"
	| "fridayActivity";

interface DayActivitiesSectionProps extends CreateWeeklyPlanFormProps {
	day: DayOfWeek;
	dayLabel: string;
}

function DayActivitiesSection({
	form,
	day,
	dayLabel,
}: DayActivitiesSectionProps) {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `step1.${day}`,
	});

	return (
		<div className="space-y-4">
			<FormField
				control={form.control}
				name={`step1.${day}`}
				render={({ field }) => (
					<FormItem>
						<div className="flex items-center justify-between">
							<FormLabel required>{dayLabel}</FormLabel>
							<Button
								disabled={field.disabled}
								type="button"
								size="sm"
								onClick={() =>
									append({
										subject: "",
										time: "",
										content: "",
									})
								}
							>
								<PlusIcon />
								<span className="hidden sm:inline-block">
									Adicionar Atividade
								</span>
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
										name={`step1.${day}.${index}.subject`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Matéria</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="Ex: Matemática"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`step1.${day}.${index}.time`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Horário</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="Ex: 14:00 - 15:00"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`step1.${day}.${index}.content`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Conteúdo</FormLabel>
												<FormControl>
													<Textarea
														{...field}
														placeholder="Descreva o conteúdo da atividade."
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
		</div>
	);
}
export function WeekActivitiesFormSection({ form }: CreateWeeklyPlanFormProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Atividades da Semana
			</h3>
			<DayActivitiesSection
				form={form}
				day="mondayActivity"
				dayLabel="Segunda-feira"
			/>
			<DayActivitiesSection
				form={form}
				day="tuesdayActivity"
				dayLabel="Terça-feira"
			/>
			<DayActivitiesSection
				form={form}
				day="wednesdayActivity"
				dayLabel="Quarta-feira"
			/>
			<DayActivitiesSection
				form={form}
				day="thursdayActivity"
				dayLabel="Quinta-feira"
			/>
			<DayActivitiesSection
				form={form}
				day="fridayActivity"
				dayLabel="Sexta-feira"
			/>
		</div>
	);
}
