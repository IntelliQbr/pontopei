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
import { Textarea } from "@/components/ui/textarea";
import type { FormSectionProps } from "../create-student-and-pei-form.schema";

export function TechnologyComunicationFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Tecnologia e Comunicação Alternativa
			</h3>
			<FormField
				control={form.control}
				name="step5.usaTecnologia"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel>Uso de tecnologia (tablet, etc.):</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "nao-usa",
										label: "Não utiliza",
									},
									{
										value: "muita-ajuda",
										label: "Com muita ajuda",
									},
									{
										value: "pouca-ajuda",
										label: "Com pouca ajuda",
									},
									{
										value: "usa-sozinho",
										label: "Usa sozinho para o básico",
									},
									{
										value: "melhor-colegas",
										label: "Usa melhor que os colegas",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`tec-${value}`}
										/>
										<Label htmlFor={`tec-${value}`}>
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
				name="step5.usaSimbolos"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel>
							Uso de símbolos/comunicação alternativa:
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "nao-usa",
										label: "Não utiliza",
									},
									{
										value: "poucos-simbolos",
										label: "Aponta/usa poucos símbolos",
									},
									{
										value: "varios-simbolos",
										label: "Usa vários símbolos",
									},
									{
										value: "combina-simbolos",
										label: "Combina 2-3 símbolos",
									},
									{
										value: "cria-combinacoes",
										label: "Cria novas combinações",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`simbolos-${value}`}
										/>
										<Label htmlFor={`simbolos-${value}`}>
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
				name="step5.aplicativosRecursos"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Aplicativos ou recursos que mais gosta:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva os apps ou recursos preferidos..."
								rows={2}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="step5.estrategiasAcalmar"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Estratégias que ajudam a acalmar:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva estratégias eficazes para acalmar a criança..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{/* Tecnologia em Casa */}
			<h4 className="text-md font-medium border-b pb-1 mt-8">
				Uso de Tecnologia em Casa
			</h4>
			<FormField
				control={form.control}
				name="step5.usaDispositivosCasa"
				render={() => (
					<FormItem>
						<div className="mb-4">
							<FormLabel required className="text-base">
								Dispositivos que usa em casa:
							</FormLabel>
						</div>
						<div className="space-y-2">
							{[
								"Tablet",
								"Smartphone",
								"Computador",
								"TV/Smart TV",
								"Console de jogos",
								"Assistente de voz",
							].map((item) => (
								<FormField
									key={item}
									control={form.control}
									name="step5.usaDispositivosCasa"
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
				name="step5.tempoEletronicos"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Tempo diário usando dispositivos eletrônicos:
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								{[
									{
										value: "nao-usa",
										label: "Não usa",
									},
									{
										value: "menos-1h",
										label: "Menos de 1 hora",
									},
									{
										value: "1-2h",
										label: "1-2 horas",
									},
									{
										value: "3-4h",
										label: "3-4 horas",
									},
									{
										value: "mais-4h",
										label: "Mais de 4 horas",
									},
								].map(({ value, label }) => (
									<div
										key={value}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={value}
											id={`tempo-${value}`}
										/>
										<Label htmlFor={`tempo-${value}`}>
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
				name="step5.aplicativosPreferidos"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Aplicativos preferidos em casa:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva os aplicativos que mais usa e gosta em casa..."
								rows={2}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
