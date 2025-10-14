import { ClassPeriodEnum } from "@/models/enums/classsroom/class-period.enum";

export const classPeriodsLabels: Record<ClassPeriodEnum, string> = {
    [ClassPeriodEnum.MORNING]: "Manhã",
    [ClassPeriodEnum.AFTERNOON]: "Tarde",
    [ClassPeriodEnum.EVENING]: "Noite",
};
