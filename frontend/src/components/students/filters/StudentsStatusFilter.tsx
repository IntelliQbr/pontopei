import { DataSelectFilter } from "@/components/shared/DataSelectFilter";
import { Label } from "@/components/ui/label";
import { studentStatusLabels } from "@/data/student.data";
import { StudentStatus } from "@/models/enums/student/student-status.enum";
import { CheckCircleIcon } from "lucide-react";

interface StudentsStatusFilterProps {
	status?: StudentStatus;
}

export function StudentsStatusFilter({ status }: StudentsStatusFilterProps) {
	const statusOptions = Object.values(StudentStatus).map((status) => ({
		value: status,
		label: studentStatusLabels[status],
	}));

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex justify-center items-center gap-2 bg-primary text-background p-2 rounded-t-lg">
				<CheckCircleIcon className="w-4 h-4" />
				<Label>Status</Label>
			</div>
			<DataSelectFilter
				filterName="status"
				placeholder="Filtre por status"
				data={statusOptions}
				defaultValue={status}
			/>
		</div>
	);
}
