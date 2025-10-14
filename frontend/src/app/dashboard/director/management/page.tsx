import { ClassroomCards } from "@/components/director/management/classrooms/ClassroomCards";
import { CreateClassroomDialog } from "@/components/director/management/classrooms/CreateClassroomDialog";
import { CreateSchoolDialog } from "@/components/director/management/schools/CreateSchoolDialog";
import { SchoolCards } from "@/components/director/management/schools/SchoolCards";
import { CreateTeacherDialog } from "@/components/director/management/teachers/CreateTeacherDialog";
import { TeacherCards } from "@/components/director/management/teachers/TeacherCards";
import { DataSearch } from "@/components/shared/DataSearch";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	GraduationCapIcon,
	SchoolIcon,
	Settings2Icon,
	ShapesIcon,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Gerenciamento - Direção",
};

export default async function DirectorManagementPage(params: {
	searchParams: Promise<{
		query_schools: string;
		page_schools: number;
		query_teachers: string;
		page_teachers: number;
		query_classrooms: string;
		page_classrooms: number;
	}>;
}) {
	const {
		query_schools,
		page_schools,
		query_teachers,
		page_teachers,
		query_classrooms,
		page_classrooms,
	} = await params.searchParams;

	return (
		<div className="flex flex-col gap-5 items-center max-w-7xl w-full mx-auto mb-10">
			<DashboardTitle Icon={Settings2Icon}>
				Área - Gerenciamento
			</DashboardTitle>
			<Tabs defaultValue="schools" className="w-full">
				<TabsList className="bg-background w-full h-12 shadow-sm">
					<TabsTrigger
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-background"
						value="schools"
					>
						<SchoolIcon className="w-4 h-4" />
						<span>Escolas</span>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-background"
						value="teachers"
					>
						<GraduationCapIcon className="w-4 h-4" />
						<span>Professores</span>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-purple-600 data-[state=active]:text-background"
						value="classrooms"
					>
						<ShapesIcon className="w-4 h-4" />
						<span>Turmas</span>
					</TabsTrigger>
				</TabsList>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm"
					value="schools"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar escola..."
							queryParamName="query_schools"
							pageParamName="page_schools"
						/>
						<CreateSchoolDialog />
					</div>
					<SchoolCards query={query_schools} page={page_schools} />
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm"
					value="teachers"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar professor..."
							queryParamName="query_teachers"
							pageParamName="page_teachers"
						/>
						<CreateTeacherDialog />
					</div>
					<TeacherCards query={query_teachers} page={page_teachers} />
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm"
					value="classrooms"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar sala de aula..."
							queryParamName="query_classrooms"
							pageParamName="page_classrooms"
						/>
						<CreateClassroomDialog />
					</div>
					<ClassroomCards
						query={query_classrooms}
						page={page_classrooms}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
