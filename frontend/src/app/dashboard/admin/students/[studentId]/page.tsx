import { GoBackButton } from "@/components/shared/GoBackButton";
import { LoaderWithIcon } from "@/components/shared/LoaerWithIcon";
import { StudentHeaderSkeleton } from "@/components/skeletons/StudenHeader.skeleton";
import { StudentHeader } from "@/components/students/StudentHeader";
import { StudentNotesHistory } from "@/components/students/notes/StudentNotesHistory";
import { StudentPEIHistory } from "@/components/students/pei/StudentPEIHistory";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeeklyPlansHistory } from "@/components/weekly-plans/WeeklyPlansHistory";
import {
	CalendarIcon,
	CircleAlertIcon,
	FileIcon,
	FileTextIcon,
} from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Admin - Aluno",
};

export default async function AdmintudentPage({
	params,
	searchParams,
}: {
	params: Promise<{ studentId: string }>;
	searchParams: Promise<{ notes_page: string; weeklyPlans_page: string }>;
}) {
	const { studentId } = await params;
	const { notes_page, weeklyPlans_page } = await searchParams;

	return (
		<div className="max-w-7xl w-full mx-auto h-full flex flex-col">
			<GoBackButton className="mb-5 self-start" />
			<Suspense fallback={<StudentHeaderSkeleton />}>
				<StudentHeader studentId={studentId} isAdmin />
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
					<div className="flex justify-between items-center flex-shrink-0 mb-4">
						<DashboardTitle Icon={FileTextIcon}>
							Histórico de PEIs
						</DashboardTitle>
					</div>
					<Suspense
						fallback={
							<LoaderWithIcon
								icon={<FileTextIcon />}
								className="m-auto"
							/>
						}
					>
						<StudentPEIHistory studentId={studentId} isAdmin />
					</Suspense>
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm flex-1 h-full mb-20"
					value="notes"
				>
					<div className="text-sm text-yellow-600 bg-yellow-500/10 p-2 rounded-md border border-yellow-500/20 mb-4 flex items-center gap-2">
						<CircleAlertIcon className="w-4 h-4" />
						<span>
							Os últimos 3 meses serão utilizados na renovação do
							PEI.
						</span>
					</div>
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
							isAdmin
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
							isAdmin
						/>
					</Suspense>
				</TabsContent>
			</Tabs>
		</div>
	);
}
