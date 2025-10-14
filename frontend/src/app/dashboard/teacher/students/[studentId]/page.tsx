import { StudentsApi } from "@/api/students.api";
import { RenewPEIDialog } from "@/components/pei/RenewPEIDialog";
import { GoBackButton } from "@/components/shared/GoBackButton";
import { LoaderWithIcon } from "@/components/shared/LoaerWithIcon";
import { StudentHeaderSkeleton } from "@/components/skeletons/StudenHeader.skeleton";
import { CreateNoteForm } from "@/components/students/notes/CreateNoteForm";
import { StudentNotesHistory } from "@/components/students/notes/StudentNotesHistory";
import { StudentPEIHistory } from "@/components/students/pei/StudentPEIHistory";
import { StudentHeader } from "@/components/students/StudentHeader";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateWeeklyPlanDialog } from "@/components/weekly-plans/CreateWeeklyPlanDialog";
import { WeeklyPlansHistory } from "@/components/weekly-plans/WeeklyPlansHistory";
import { CalendarIcon, FileIcon, FileTextIcon } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Aluno - Professor",
};

export default async function StudentPage({
	params,
	searchParams,
}: {
	params: Promise<{ studentId: string }>;
	searchParams: Promise<{ notes_page: string; weeklyPlans_page: string }>;
}) {
	const { studentId } = await params;
	const { notes_page, weeklyPlans_page } = await searchParams;
	const student = await StudentsApi.findOneStudent(studentId);

	return (
		<div className="max-w-7xl w-full mx-auto h-full flex flex-col">
			<GoBackButton className="mb-5 self-start" />
			<Suspense fallback={<StudentHeaderSkeleton />}>
				<StudentHeader studentId={studentId} />
			</Suspense>
			<Tabs defaultValue="peis" className="w-full my-5 flex flex-col">
				<TabsList className="bg-background w-full h-12 shadow-sm">
					<TabsTrigger
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="peis"
					>
						<FileTextIcon className="w-4 h-4" />
						<span>PEIs</span>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="notes"
					>
						<FileIcon className="w-4 h-4" />
						<span>Anotações</span>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="weeklyPlans"
					>
						<CalendarIcon className="w-4 h-4" />
						<span>Planos Semanais</span>
					</TabsTrigger>
				</TabsList>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm flex-1 h-full mb-20"
					value="peis"
				>
					<div className="flex sm:flex-row flex-col justify-between sm:items-center flex-shrink-0 mb-4 flex-wrap gap-2">
						<DashboardTitle Icon={FileTextIcon}>
							Histórico de PEIs
						</DashboardTitle>
						<RenewPEIDialog studentId={studentId} />
					</div>
					<Suspense
						fallback={
							<LoaderWithIcon
								icon={<FileTextIcon />}
								className="m-auto"
							/>
						}
					>
						<StudentPEIHistory studentId={studentId} />
					</Suspense>
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm flex-1 h-full mb-20"
					value="notes"
				>
					<CreateNoteForm studentId={studentId} />
					<Separator className="my-4" />
					<Suspense
						fallback={
							<LoaderWithIcon
								icon={<FileIcon />}
								className="m-auto"
							/>
						}
					>
						<StudentNotesHistory
							studentId={studentId}
							pageParamName="notes_page"
							currentPage={Number(notes_page ?? 1)}
						/>
					</Suspense>
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm flex-1 h-full mb-20"
					value="weeklyPlans"
				>
					<div className="flex sm:flex-row flex-col justify-between sm:items-center flex-shrink-0 mb-4 flex-wrap gap-2">
						<DashboardTitle Icon={CalendarIcon}>
							Planos Semanais
						</DashboardTitle>
						<CreateWeeklyPlanDialog
							weeklyPlans={student.weeklyPlans}
							studentId={studentId}
						/>
					</div>
					<Suspense
						fallback={
							<LoaderWithIcon
								icon={<CalendarIcon />}
								className="m-auto"
							/>
						}
					>
						<WeeklyPlansHistory
							studentId={studentId}
							pageParamName="weeklyPlans_page"
							currentPage={Number(weeklyPlans_page ?? 1)}
						/>
					</Suspense>
				</TabsContent>
			</Tabs>
		</div>
	);
}
