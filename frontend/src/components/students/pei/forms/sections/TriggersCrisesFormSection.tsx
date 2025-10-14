"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { FormSectionProps } from "../create-student-and-pei-form.schema";

export function TriggersCrisesFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Gatilhos e Crises
			</h3>
			<FormField
				control={form.control}
				name="step5.situacoesCrises"
				render={() => (
					<FormItem>
						<div className="mb-4">
							<FormLabel required className="text-base">
								Situações que costumam gerar crises:
							</FormLabel>
						</div>
						<div className="space-y-2">
							{[
								"Mudança de rotina",
								"Barulhos altos",
								"Multidões",
								"Frustração",
								"Não ser compreendido",
							].map((item) => (
								<FormField
									key={item}
									control={form.control}
									name="step5.situacoesCrises"
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
			<FormField
				control={form.control}
				name="step5.sinaisAntecedem"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Sinais que antecedem as crises:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva os sinais (agitação, choro, etc.)..."
								rows={2}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step5.estrategiasAcalmarCasa"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Estratégias que ajudam a acalmar em casa:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva o que funciona para acalmar a criança..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
