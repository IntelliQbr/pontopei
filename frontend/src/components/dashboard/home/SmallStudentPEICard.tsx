import { Muted } from "@/components/typography/Muted";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { peiStatusColors, peiStatusLabels } from "@/data/pei.data";
import { cn } from "@/lib/utils";
import { StudentGender } from "@/models/enums/student/student-gender.enum";
import { PEI } from "@/models/interfaces/pei/pei.interface";
import { School } from "lucide-react";

interface SmallStudentPEICardProps {
	pei: PEI;
}

export function SmallStudentPEICard({ pei }: SmallStudentPEICardProps) {
	return (
		<div className="mt-5">
			<div
				className={cn(
					"relative overflow-hidden rounded-xl border border-b-8 bg-card/50 p-5 transition-all hover:scale-[1.02] hover:shadow-lg",
					"before:absolute before:inset-0 before:-z-10 before:rounded-xl",
					pei.student.gender === StudentGender.MALE
						? "border-primary/15 hover:border-primary/25 before:bg-gradient-to-r before:from-primary/5 before:to-transparent"
						: "border-pink-500/15 hover:border-pink-500/25 before:bg-gradient-to-r before:from-pink-500/5 before:to-transparent"
				)}
			>
				<div className="flex items-center justify-between gap-5">
					<div className="flex items-center gap-4">
						<Avatar
							className={cn(
								"ring-1 transition-all w-10 h-10",
								pei.student.gender === StudentGender.MALE
									? "ring-primary/20"
									: "ring-pink-500/20"
							)}
						>
							<AvatarImage
								src={pei.student.photoUrl || ""}
								className="object-cover transition-transform hover:scale-105"
							/>
							<AvatarFallback
								className={cn(
									"font-semibold transition-colors",
									pei.student.gender === StudentGender.MALE
										? "bg-primary/10 text-primary"
										: "bg-pink-500/10 text-pink-500"
								)}
							>
								{pei.student.fullName.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="space-y-1">
							<h3 className="font-semibold text-base leading-tight">
								{pei.student.fullName}
							</h3>
							<div className="flex items-center text-xs text-muted-foreground">
								<School className="mr-1.5 h-3.5 w-3.5" />
								<Muted className="truncate max-w-[180px]">
									{
										pei.student?.classroomAssignment
											?.classroom?.name
									}{" "}
									•{" "}
									{
										pei.student?.classroomAssignment
											?.classroom?.grade
									}
								</Muted>
							</div>
						</div>
					</div>

					<Badge
						variant="outline"
						className={cn(
							"rounded-full px-3 py-1.5 text-[11px] font-medium tracking-tight",
							"hover:scale-105 transition-transform",
							peiStatusColors[pei.status]
						)}
					>
						{peiStatusLabels[pei.status]}
					</Badge>
				</div>
			</div>
		</div>
	);
}
