import { StudentsFilterSkeleton } from "@/components/skeletons/StudentsFilter.skeleton";
import { CleanFiltersButton } from "@/components/students/filters/CleanFiltersButton";
import { StudentsClassPeriodFilter } from "@/components/students/filters/StudentsClassPeriodFilter";
import { StudentsClassroomFilter } from "@/components/students/filters/StudentsClassroomFilter";
import { StudentsDirectorFilter } from "@/components/students/filters/StudentsDirectorFilter";
import { StudentsSchoolFilter } from "@/components/students/filters/StudentsSchoolFilter";
import { StudentsStatusFilter } from "@/components/students/filters/StudentsStatusFilter";
import { StudentsTeacherFilter } from "@/components/students/filters/StudentsTeacherFilter";
import { H2 } from "@/components/typography/H2";
import { AdminStudentsSearchParams } from "@/models/types/params/admin-sutudents-search-params.type";
import { FilterIcon } from "lucide-react";
import { Suspense } from "react";

interface AdminStudentsFilterProps {
	searchParams: AdminStudentsSearchParams;
}

export function AdminStudentsFilter({
	searchParams,
}: AdminStudentsFilterProps) {
	const filters = [
		{
			id: "director",
			key: searchParams.directorId,
			fallback: <StudentsFilterSkeleton />,
			Component: StudentsDirectorFilter,
			props: { directorId: searchParams.directorId },
		},
		{
			id: "teacher",
			key: searchParams.teacherId,
			fallback: <StudentsFilterSkeleton />,
			Component: StudentsTeacherFilter,
			props: {
				teacherId: searchParams.teacherId,
				directorId: searchParams.directorId,
				isAdmin: true,
			},
		},
		{
			id: "school",
			key: searchParams.schoolId,
			fallback: <StudentsFilterSkeleton />,
			Component: StudentsSchoolFilter,
			props: {
				schoolId: searchParams.schoolId,
				directorId: searchParams.directorId,
				isAdmin: true,
			},
		},
		{
			id: "classroom",
			key: searchParams.classroomId,
			fallback: <StudentsFilterSkeleton />,
			Component: StudentsClassroomFilter,
			props: {
				classroomId: searchParams.classroomId,
				directorId: searchParams.directorId,
				isAdmin: true,
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
			<CleanFiltersButton cleanPath="/dashboard/admin/students" />
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
