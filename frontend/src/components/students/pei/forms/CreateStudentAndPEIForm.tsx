"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AiLoadingCard } from "@/components/shared/AiLoadingCard";
import { FormStepNavigation } from "@/components/shared/FormStepNavigation";
import { Step, Stepper } from "@/components/shared/Stepper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useStepForm } from "@/hooks/useStepForm";
import { api } from "@/lib/axios";
import { Student } from "@/models/interfaces/student/student.intertface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { format } from "date-fns";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
	defaultValues,
	formSchema,
	type CreateStudentAndPEIFormData,
} from "./create-student-and-pei-form.schema";
import { FamiliarInformationsFormStep } from "./steps/FamiliarInformationsFormStep";
import { HealthDevelopmentTherapiesFormStep } from "./steps/HealthDevelopmentTherapiesFormStep";
import { IdentificationFormStep } from "./steps/IdentificationFormStep";
import { PedagogicalObservationsFormStep } from "./steps/PedagogicalObservationsFormStep";
import { PreferencesStrategiesFormStep } from "./steps/PreferencesStrategiesFormStep";

const steps: Step[] = [
	{
		id: 1,
		title: "Identificação",
		description: "Informações básicas do aluno",
	},
	{
		id: 2,
		title: "Observações Pedagógicas",
		description: "Avaliação do professor",
	},
	{
		id: 3,
		title: "Informações Familiares",
		description: "Dados dos pais/responsáveis",
	},
	{
		id: 4,
		title: "Saúde e Terapias",
		description: "Desenvolvimento e saúde",
	},
	{
		id: 5,
		title: "Preferências e Estratégias",
		description: "Gatilhos e interesses",
	},
];

interface CreateStudentAndPEIFormProps {
	onSuccess: () => void;
	student?: Student;
	isRenewal?: boolean;
}

export default function CreateStudentAndPEIForm({
	onSuccess,
	student,
	isRenewal,
}: CreateStudentAndPEIFormProps) {
	const storageKeyPrefix = student
		? `create-student-and-pei-${student.id}`
		: "create-student-and-pei";

	const form = useForm<CreateStudentAndPEIFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: student
			? {
					...defaultValues,
					step1: {
						...defaultValues.step1,
						cid: student.cid,
						fullName: student.fullName,
						dateOfBirth: format(
							new Date(student.dateOfBirth),
							"yyyy-MM-dd"
						),
						photoUrl: student.photoUrl ?? undefined,
						classroomId: student.classroomAssignment.classroomId,
						parentGuardian: student.parentGuardian,
						medicalConditions: student.medicalConditions,
						specialNeeds: student.specialNeeds,
						hasCamping: student.hasCamping,
						gender: student.gender,
					},
			  }
			: defaultValues,
		mode: "all",
	});

	const { currentStep, nextStep, prevStep, progress, clearForm } =
		useStepForm<CreateStudentAndPEIFormData>({
			steps,
			form,
			storageKeyPrefix,
			defaultValues: form.getValues(),
		});

	const router = useRouter();

	const onSubmit = async (data: CreateStudentAndPEIFormData) => {
		try {
			// Cadastra o aluno
			if (!student) {
				const { data: studentData } = await api.post(
					"/students",
					data.step1
				);

				student = studentData as Student;
			}

			// Cadastra o PEI
			const peiData = {
				studentId: student.id,
				formQuestions: data,
			};

			if (isRenewal) {
				await api.post("/pei/renew", peiData);
				toast.success("Formulário PEI renovado com sucesso!", {
					description:
						"Os dados foram usados para a renovação do PEI.",
				});
			} else {
				await api.post("/pei", peiData);
				toast.success("Formulário PEI enviado com sucesso!", {
					description:
						"Os dados foram usados para o cadastro do aluno e do PEI usando IA.",
				});
			}

			clearForm();
			onSuccess();
			router.refresh();
		} catch (error) {
			toast.error("Erro ao enviar o formulário PEI", {
				description: getMessageFromAxiosError(error),
			});
		}
	};

	const renderCurrentSection = () => {
		switch (currentStep) {
			case 1:
				return <IdentificationFormStep form={form} />;
			case 2:
				return <PedagogicalObservationsFormStep form={form} />;
			case 3:
				return <FamiliarInformationsFormStep form={form} />;
			case 4:
				return <HealthDevelopmentTherapiesFormStep form={form} />;
			case 5:
				return <PreferencesStrategiesFormStep form={form} />;
			default:
				return null;
		}
	};

	return (
		<div className="w-full space-y-2 sm:space-y-4 xl:space-y-8">
			<Stepper
				steps={steps}
				currentStep={currentStep}
				progress={progress}
			/>
			<div className="flex items-center justify-between absolute sm:top-15 top-8 sm:right-2 right-0 left-65 sm:left-auto">
				<Button variant="destructive" size="sm" onClick={clearForm}>
					<TrashIcon className="w-4 h-4" />
				</Button>
			</div>

			{form.formState.isSubmitting && (
				<AiLoadingCard>
					Formulário PEI sendo gerado com IA. Por favor, aguarde...
				</AiLoadingCard>
			)}

			<form onSubmit={(e) => e.preventDefault()} className="space-y-4">
				<Form {...form}>
					{renderCurrentSection()}

					<FormStepNavigation
						isSubmitting={form.formState.isSubmitting}
						currentStep={currentStep}
						totalSteps={steps.length}
						onPrevious={prevStep}
						onNext={nextStep}
						onSubmit={() => form.handleSubmit(onSubmit)()}
						finalButtonText="Finalizar PEI"
					/>
				</Form>
			</form>
		</div>
	);
}
