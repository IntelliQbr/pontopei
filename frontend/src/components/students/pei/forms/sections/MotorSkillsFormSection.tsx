"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormSectionProps } from "../create-student-and-pei-form.schema";

export function MotorSkillsFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Habilidades Motoras
			</h3>
			<FormField
				control={form.control}
				name="step4.areasMaiorNecessidade"
				render={() => (
					<FormItem>
						<div className="mb-4">
							<FormLabel required className="text-base">
								Áreas de maior necessidade:
							</FormLabel>
						</div>
						<div className="space-y-2">
							{[
								"Coordenação motora fina (mãos, dedos)",
								"Coordenação motora grossa (corpo todo)",
								"Equilíbrio e postura",
								"Força muscular",
							].map((item) => (
								<FormField
									key={item}
									control={form.control}
									name="step4.areasMaiorNecessidade"
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
				name="step4.seguraLapis"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>Como segura o lápis?</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "nao-consegue",
										label: "Não consegue segurar",
									},
									{
										value: "com-dificuldade",
										label: "Com dificuldade",
									},
									{
										value: "segura-nao-escreve",
										label: "Segura, mas não escreve",
									},
									{
										value: "adequadamente",
										label: "Adequadamente",
									},
									{
										value: "escreve-facilidade",
										label: "Escreve com facilidade",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`lapis-${value}`}
										/>
										<Label htmlFor={`lapis-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step4.recortaTesoura"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Como recorta com a tesoura?
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "nao-consegue",
										label: "Não consegue usar",
									},
									{
										value: "ajuda-total",
										label: "Com ajuda total",
									},
									{
										value: "ajuda-parcial",
										label: "Com ajuda parcial",
									},
									{
										value: "linha-reta",
										label: "Recorta em linha reta",
									},
									{
										value: "formas-complexas",
										label: "Recorta formas complexas",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`tesoura-${value}`}
										/>
										<Label htmlFor={`tesoura-${value}`}>
											{label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
