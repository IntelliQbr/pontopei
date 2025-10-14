"use client";

import { Note } from "@/models/interfaces/note/note.interface";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { format } from "date-fns";
import { Badge } from "../ui/badge";

interface NoteCardProps {
	note: Note;
	studentDetails?: string;
}

export function NoteCard({ note, studentDetails }: NoteCardProps) {
	return (
		<div className="self-stretch bg-background p-4 rounded-lg shadow-sm flex flex-col gap-2 border border-primary/20">
			<div className="flex items-center gap-2 flex-wrap">
				{studentDetails && (
					<Badge
						variant="outline"
						className="text-xs text-muted-foreground"
					>
						{studentDetails}
					</Badge>
				)}
				<span className="text-xs text-muted-foreground">
					Criado em: {format(note.createdAt, "dd/MM/yyyy HH:mm")}
				</span>
			</div>
			<div className="max-h-[200px] overflow-y-auto">
				<MarkdownPreview
					source={note.content}
					style={{
						backgroundColor: "#f9fafb",
						color: "var(--foreground)",
						padding: "1.5rem",
						borderRadius: "0.5rem",
						height: "100%",
					}}
				/>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-xs text-muted-foreground">
					ID: {note.id}
				</span>
			</div>
		</div>
	);
}
