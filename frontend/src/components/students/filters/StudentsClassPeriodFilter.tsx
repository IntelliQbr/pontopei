import { DataSelectFilter } from "@/components/shared/DataSelectFilter";
import { Label } from "@/components/ui/label";
import { classPeriodsLabels } from "@/data/classroom.data";
import { ClassPeriodEnum } from "@/models/enums/classsroom/class-period.enum";
import { ClockIcon } from "lucide-react";

interface StudentsClassPeriodFilterProps {
	classPeriod?: ClassPeriodEnum;
}

export function StudentsClassPeriodFilter({
	classPeriod,
}: StudentsClassPeriodFilterProps) {
	const periodOptions = Object.values(ClassPeriodEnum).map((period) => ({
		value: period,
		label: classPeriodsLabels[period],
	}));

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex justify-center items-center gap-2 bg-primary text-background p-2 rounded-t-lg">
				<ClockIcon className="w-4 h-4" />
				<Label>Período</Label>
			</div>
			<DataSelectFilter
				filterName="classPeriod"
				placeholder="Filtre por período"
				data={periodOptions}
				defaultValue={classPeriod}
			/>
		</div>
	);
}
