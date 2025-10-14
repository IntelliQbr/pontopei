"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { FormSectionProps } from "../create-student-and-pei-form.schema";

export function TherapeuticHistoryFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Histórico Terapêutico
			</h3>
			<FormField
				control={form.control}
				name="step4.terapias"
				render={() => (
					<FormItem>
						<div className="mb-4">
							<FormLabel required className="text-base">
								Quais terapias faz ou já fez?
							</FormLabel>
						</div>
						<div className="space-y-2">
							{[
								"Fonoaudiologia",
								"Terapia Ocupacional",
								"Psicologia (ABA, TCC, etc.)",
								"Fisioterapia",
								"Psicomotricidade",
								"Nenhuma",
							].map((item) => (
								<FormField
									key={item}
									control={form.control}
									name="step4.terapias"
									render={({ field }) => (
										<FormItem
											key={item}
											className="flex flex-row items-start space-x-3 space-y-0"
										>
											<FormControl>
												<Checkbox
													disabled={field.disabled}
													checked={field.value?.includes(
														item
													)}
													onCheckedChange={(
														checked
													) => {
														return checked
															? field.onChange([
																	...field.value,
																	item,
															  ])
															: field.onChange(
																	field.value?.filter(
																		(
																			value
																		) =>
																			value !==
																			item
																	)
															  );
													}}
												/>
											</FormControl>
											<FormLabel className="font-normal">
												{item}
											</FormLabel>
										</FormItem>
									)}
								/>
							))}
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
