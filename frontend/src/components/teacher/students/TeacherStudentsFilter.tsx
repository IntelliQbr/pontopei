import { StudentsFilterSkeleton } from "@/components/skeletons/StudentsFilter.skeleton";
import { CleanFiltersButton } from "@/components/students/filters/CleanFiltersButton";
import { StudentsClassPeriodFilter } from "@/components/students/filters/StudentsClassPeriodFilter";
import { StudentsClassroomFilter } from "@/components/students/filters/StudentsClassroomFilter";
import { StudentsStatusFilter } from "@/components/students/filters/StudentsStatusFilter";
import { H2 } from "@/components/typography/H2";
import { TeacherStudentsSearchParams } from "@/models/types/params/teacher-sutudents-search-params.type copy";
import { FilterIcon } from "lucide-react";
import { Suspense } from "react";

interface TeacherStudentsFilterProps {
	searchParams: TeacherStudentsSearchParams;
}

export function TeacherStudentsFilter({
	searchParams,
}: TeacherStudentsFilterProps) {
	const filters = [
		{
			id: "classroom",
			key: searchParams.classroomId,
			fallback: <StudentsFilterSkeleton />,
			Component: StudentsClassroomFilter,
			props: { classroomId: searchParams.classroomId },
		},
		{
			id: "period",
			key: searchParams.classPeriod,
			fallback: <StudentsFilterSkeleton />,
			Component: StudentsClassPeriodFilter,
			props: { classPeriod: searchParams.classPeriod },
		},
		{
			id: "status",
			key: searchParams.status,
			fallback: <StudentsFilterSkeleton />,
			Component: StudentsStatusFilter,
			props: { status: searchParams.status },
		},
	];

	return (
		<div className="space-y-5 bg-primary/5 p-4 rounded-lg">
			<H2 className="flex items-center gap-2">
				<div className="flex justify-center items-center bg-primary text-background p-2 rounded-full">
					<FilterIcon className="w-4 h-4" />
				</div>
				<span>Filtros</span>
			</H2>
			<CleanFiltersButton cleanPath="/dashboard/teacher/students" />
			<div className="flex sm:flex-col flex-row justify-between flex-wrap gap-5">
				{filters.map(({ id, key, fallback, Component, props }) => (
					<Suspense key={key || id} fallback={fallback}>
						<Component {...props} />
					</Suspense>
				))}
			</div>
		</div>
	);
}
