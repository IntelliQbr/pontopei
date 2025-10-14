"use client";

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CreateWeeklyPlanFormProps } from "../create-weekly-plan-form.schema";

export function WeekDateFormSection({ form }: CreateWeeklyPlanFormProps) {
	const handleWeekStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		form.setValue(
			"step1.weekEnd",
			format(
				new Date(
					new Date(e.target.value).setDate(
						new Date(e.target.value).getDate() + 7
					)
				),
				"yyyy-MM-dd"
			)
		);
	};
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Datas da Semana
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<FormField
					control={form.control}
					name="step1.weekStart"
					render={({ field }) => (
						<FormItem>
							<FormLabel required>Início da Semana</FormLabel>
							<FormControl>
								<Input
									{...field}
									onChange={(e) => {
										handleWeekStartChange(e);
										field.onChange(e);
									}}
									type="date"
								/>
							</FormControl>
							<FormDescription>
								Data de início da semana.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="step1.weekEnd"
					render={({ field }) => (
						<FormItem>
							<FormLabel required>Fim da Semana</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
							<FormDescription>
								Data de fim da semana.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}
