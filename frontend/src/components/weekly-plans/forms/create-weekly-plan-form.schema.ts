import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const activitySchema = z.object({
	subject: z.string().min(1, { message: "A matéria é obrigatória" }),
	time: z.string().min(1, { message: "O horário é obrigatório" }),
	content: z.string().min(1, { message: "O conteúdo é obrigatório" }),
});

export const createWeeklyPlanFormSchema = z.object({
	step1: z.object({
		weekStart: z.string("A semana começa é obrigatória").min(1, {
			message: "A semana começa é obrigatória",
		}),
		weekEnd: z.string("A semana termina é obrigatória").min(1, {
			message: "A semana termina é obrigatória",
		}),
		mondayActivity: z.array(activitySchema),

		tuesdayActivity: z.array(activitySchema),

		wednesdayActivity: z.array(activitySchema),

		thursdayActivity: z.array(activitySchema),

		fridayActivity: z.array(activitySchema),
	}),
	step2: z.object({
		recursosDisponiveis: z
			.string("Recursos disponíveis é obrigatório")
			.min(1, {
				message: "Recursos disponíveis é obrigatório",
			}),
		feedbackPassado: z
			.string("Feedback da semana passada é obrigatório")
			.min(1, {
				message: "Feedback da semana passada é obrigatório",
			}),
		observacoes: z.string().optional(),
	}),
});

export type CreateWeeklyPlanFormData = z.infer<
	typeof createWeeklyPlanFormSchema
>;

export interface CreateWeeklyPlanFormProps {
	form: UseFormReturn<CreateWeeklyPlanFormData>;
}

export const defaultValues: CreateWeeklyPlanFormData = {
	step1: {
		weekStart: format(new Date(), "yyyy-MM-dd"),
		weekEnd: format(
			new Date(new Date().setDate(new Date().getDate() + 7)),
			"yyyy-MM-dd"
		),
		mondayActivity: [],
		tuesdayActivity: [],
		wednesdayActivity: [],
		thursdayActivity: [],
		fridayActivity: [],
	},
	step2: {
		recursosDisponiveis: "",
		feedbackPassado: "",
		observacoes: "",
	},
};
