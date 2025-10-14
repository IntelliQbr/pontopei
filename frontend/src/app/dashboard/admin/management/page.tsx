import { AiRequestsTable } from "@/components/admin/ai-requests/AiRequestsTable";
import { AdminCreateClassroomDialog } from "@/components/admin/classrooms/AdminCreateClassroomDialog";
import { ClassroomsTable } from "@/components/admin/classrooms/ClassroomsTable";
import { AdminCreateSchoolDialog } from "@/components/admin/schools/AdminCreateSchoolDialog";
import { SchoolsTable } from "@/components/admin/schools/SchoolsTable";
import { DataSearch } from "@/components/shared/DataSearch";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainIcon, SchoolIcon, Settings2Icon, ShapesIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Admin - Gerenciamento",
};

export default async function AdminManagementPage(params: {
	searchParams: Promise<{
		query_schools: string;
		page_schools: number;
		query_classrooms: string;
		page_classrooms: number;
		query_ai_requests: string;
		page_ai_requests: number;
	}>;
}) {
	const {
		query_schools,
		page_schools,
		query_classrooms,
		page_classrooms,
		query_ai_requests,
		page_ai_requests,
	} = await params.searchParams;

	return (
		<div className="flex flex-col gap-5 items-center max-w-7xl w-full mx-auto my-10">
			<DashboardTitle Icon={Settings2Icon}>
				Admin - Gerenciamento
			</DashboardTitle>
			<Tabs defaultValue="schools" className="w-full">
				<TabsList className="bg-background w-full h-12 shadow-sm">
					<TabsTrigger
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="schools"
					>
						<SchoolIcon className="w-4 h-4" />
						<span>Escolas</span>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="classrooms"
					>
						<ShapesIcon className="w-4 h-4" />
						<span>Salas de aula</span>
					</TabsTrigger>
					<TabsTrigger
						className="flex items-center gap-2 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background"
						value="ai-requests"
					>
						<BrainIcon className="w-4 h-4" />
						<span>Requisições IA</span>
					</TabsTrigger>
				</TabsList>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm space-y-5"
					value="schools"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar escola..."
							queryParamName="query_schools"
							pageParamName="page_schools"
						/>
						<AdminCreateSchoolDialog />
					</div>
					<SchoolsTable
						currentPage={page_schools ?? 1}
						pageParamName="page_schools"
						search={query_schools}
					/>
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm space-y-5"
					value="classrooms"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar sala de aula..."
							queryParamName="query_classrooms"
							pageParamName="page_classrooms"
						/>
						<AdminCreateClassroomDialog />
					</div>
					<ClassroomsTable
						currentPage={page_classrooms ?? 1}
						pageParamName="page_classrooms"
						search={query_classrooms}
					/>
				</TabsContent>
				<TabsContent
					className="bg-background p-4 rounded-lg shadow-sm space-y-5"
					value="ai-requests"
				>
					<div className="flex justify-end gap-2">
						<DataSearch
							placeholder="Buscar solicitação de IA..."
							queryParamName="query_ai_requests"
							pageParamName="page_ai_requests"
						/>
					</div>
					<AiRequestsTable
						currentPage={page_ai_requests ?? 1}
						pageParamName="page_ai_requests"
						search={query_ai_requests}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
