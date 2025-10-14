import { AdminNotesApi } from "@/api/admin-notes.api";
import { NotesApi } from "@/api/notes.api";
import { NoteCard } from "@/components/notes/NoteCard";
import { DataPagination } from "@/components/shared/DataPagination";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { Note } from "@/models/interfaces/note/note.interface";
import { FileIcon } from "lucide-react";

interface StudentNotesHistoryProps {
	studentId: string;
	pageParamName: string;
	currentPage: number;
	isAdmin?: boolean;
}

export async function StudentNotesHistory({
	studentId,
	isAdmin = false,
	pageParamName,
	currentPage,
}: StudentNotesHistoryProps) {
	const DEFAULT_TAKE = 10;
	const skip = currentPage === 1 ? 0 : (currentPage - 1) * DEFAULT_TAKE;

	let notes: Note[] = [];
	let total = 0;

	if (isAdmin) {
		const { notes: adminNotes, total: adminTotal } =
			await AdminNotesApi.findAllByStudentId(studentId, {
				skip,
				take: DEFAULT_TAKE,
			});

		notes = adminNotes;
		total = adminTotal;
	} else {
		const { notes: studentNotes, total: studentTotal } =
			await NotesApi.findAllByStudentId(studentId, {
				skip,
				take: DEFAULT_TAKE,
			});

		notes = studentNotes;
		total = studentTotal;
	}

	const totalPages = total !== 0 ? Math.ceil(total / DEFAULT_TAKE) : 0;
	const hasPagination = total > DEFAULT_TAKE;

	const orderByDate = (a: Note, b: Note) => {
		return (
			new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);
	};

	return (
		<div className="flex flex-col items-center gap-4">
			{notes.length === 0 && (
				<Card className="flex flex-col items-center justify-center shadow-none border-0">
					<CardAction className="border-0">
						<CardContent className="p-8 text-center">
							<FileIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<p className="text-gray-500">
								Nenhuma anotação encontrada para este aluno.
							</p>
						</CardContent>
					</CardAction>
				</Card>
			)}

			{notes.sort(orderByDate).map((note) => (
				<NoteCard key={note.id} note={note} />
			))}

			{hasPagination && (
				<DataPagination
					totalPages={totalPages}
					pageParamName={pageParamName}
				/>
			)}
		</div>
	);
}
