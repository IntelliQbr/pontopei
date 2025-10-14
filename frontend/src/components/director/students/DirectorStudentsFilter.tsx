import { StudentsFilterSkeleton } from "@/components/skeletons/StudentsFilter.skeleton";
import { CleanFiltersButton } from "@/components/students/filters/CleanFiltersButton";
import { StudentsClassPeriodFilter } from "@/components/students/filters/StudentsClassPeriodFilter";
import { StudentsClassroomFilter } from "@/components/students/filters/StudentsClassroomFilter";
import { StudentsSchoolFilter } from "@/components/students/filters/StudentsSchoolFilter";
import { StudentsStatusFilter } from "@/components/students/filters/StudentsStatusFilter";
import { StudentsTeacherFilter } from "@/components/students/filters/StudentsTeacherFilter";
import { H2 } from "@/components/typography/H2";
import { DirectorStudentsSearchParams } from "@/models/types/params/director-sutudents-search-params.type";
import { FilterIcon } from "lucide-react";
import { Suspense } from "react";

interface DirectorStudentsFilterProps {
	searchParams: DirectorStudentsSearchParams;
}

export function DirectorStudentsFilter({
	searchParams,
}: DirectorStudentsFilterProps) {
	const filters = [
		{
			id: "school",
			key: searchParams.schoolId,
			fallback: <StudentsFilterSkeleton />,
			Component: StudentsSchoolFilter,
			props: { schoolId: searchParams.schoolId },
		},
		{
			id: "classroom",
			key: searchParams.classroomId,
			fallback: <StudentsFilterSkeleton />,
			Component: StudentsClassroomFilter,
			props: { classroomId: searchParams.classroomId },
		},
		{
			id: "teacher",
			key: searchParams.teacherId,
			fallback: <StudentsFilterSkeleton />,
			Component: StudentsTeacherFilter,
			props: {
				teacherId: searchParams.teacherId,
			},
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
			<CleanFiltersButton cleanPath="/dashboard/director/students" />
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
