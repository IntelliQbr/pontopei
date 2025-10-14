import { Muted } from "@/components/typography/Muted";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { profileRoleLabels } from "@/data/profile.data";
import { cn } from "@/lib/utils";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { Profile } from "@/models/interfaces/profile/profile.interface";
import { format } from "date-fns";
import { AtSignIcon, CalendarIcon } from "lucide-react";

interface SmallProfileCardProps {
	profile: Profile;
}

const profileRoleColors: Record<ProfileRoleEnum, string> = {
	[ProfileRoleEnum.DIRECTOR]: "bg-amber-100 text-amber-800",
	[ProfileRoleEnum.TEACHER]: "bg-blue-100 text-blue-800",
};

export function SmallProfileCard({ profile }: SmallProfileCardProps) {
	return (
		<div className="mt-3">
			<div
				className={cn(
					"relative overflow-hidden rounded-xl border border-b-8 bg-card/50 p-2 transition-all hover:scale-[1.02] hover:shadow-lg",
					"before:absolute before:inset-0 before:-z-10 before:rounded-xl",
					"border-primary/15 hover:border-primary/25 before:bg-gradient-to-r before:from-primary/5 before:to-transparent"
				)}
			>
				<div className="flex items-center justify-between gap-5">
					<div className="flex items-center gap-4">
						<Avatar
							className={cn(
								"ring-1 transition-all",
								"ring-primary/20"
							)}
						>
							<AvatarImage
								src={
									profile.avatarUrl ||
									`https://avatar.vercel.sh/${profile.user.email}`
								}
								className="object-cover transition-transform hover:scale-105"
							/>
							<AvatarFallback className="font-semibold bg-primary/10 text-primary">
								{profile.user.fullName.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="space-y-1">
							<h3 className="font-semibold text-sm leading-tight">
								{profile.user.fullName}
							</h3>
							<div className="flex items-center text-xs text-muted-foreground">
								<AtSignIcon className="mr-1.5 h-3.5 w-3.5" />
								<Muted className="truncate max-w-[300px] text-xs">
									{profile.user.email}
								</Muted>
							</div>
							<div className="flex items-center text-xs text-muted-foreground">
								<CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
								<Muted className="text-xs">
									{format(
										profile.user.createdAt,
										"dd/MM/yyyy"
									)}
								</Muted>
							</div>
						</div>
					</div>

					<Badge
						variant="outline"
						className={cn(
							"rounded-full px-3 py-1.5 text-[11px] font-medium tracking-tight",
							"hover:scale-105 transition-transform",
							profileRoleColors[profile.role]
						)}
					>
						{profileRoleLabels[profile.role]}
					</Badge>
				</div>
			</div>
		</div>
	);
}
