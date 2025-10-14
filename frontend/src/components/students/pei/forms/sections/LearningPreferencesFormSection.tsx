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

export function LearningPreferencesFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Preferências de Aprendizagem
			</h3>
			<FormField
				control={form.control}
				name="step5.comoAprendeMelhor"
				render={() => (
					<FormItem>
						<div className="mb-4">
							<FormLabel required className="text-base">
								Como aprende melhor?
							</FormLabel>
						</div>
						<div className="space-y-2">
							{[
								"Visual (imagens, vídeos)",
								"Auditivo (músicas, histórias)",
								"Tátil (pegando objetos)",
								"Movimento (atividades práticas)",
							].map((item) => (
								<FormField
									key={item}
									control={form.control}
									name="step5.comoAprendeMelhor"
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
				name="step5.materiaisInteresse"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Materiais/brinquedos de maior interesse:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva os materiais que mais despertam o interesse..."
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
