import { NotesApi } from "@/api/notes.api";
import { NoteCard } from "@/components/notes/NoteCard";
import { DashboardTitleH2 } from "@/components/typography/DashboardTitleH2";
import { FileIcon } from "lucide-react";

export async function TeacherLatestsNotes() {
	const notes = await NotesApi.getLatestsNotesToTeacher();

	return (
		<div className="bg-background shadow-sm rounded-lg p-4 w-full space-y-4">
			<DashboardTitleH2 Icon={FileIcon}>
				Anotações Recentes
			</DashboardTitleH2>
			<div className="flex flex-col gap-4">
				{notes.length === 0 && (
					<div className="h-96 flex justify-center items-center text-muted-foreground">
						As ultimas notas cadastradas serão exibidas aqui.
					</div>
				)}

				{notes.map((note) => (
					<NoteCard
						key={note.id}
						note={note}
						studentDetails={`${note?.student?.fullName} - ${note?.student?.classroomAssignment?.classroom?.name} | ${note?.student?.classroomAssignment?.classroom?.grade}`}
					/>
				))}
			</div>
		</div>
	);
}
