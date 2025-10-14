import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/models/interfaces/user/user.interface";
import { SchoolIcon } from "lucide-react";
import { TeacherActions } from "./TeachersActions";

interface TeacherCardProps {
    teacher: User;
}

export function TeacherCard({ teacher }: TeacherCardProps) {
    return (
        <div className="flex justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage
                            src={
                                teacher.profile?.avatarUrl ||
                                `https://avatar.vercel.sh/${teacher.email}`
                            }
                            alt={teacher.fullName}
                        />
                        <AvatarFallback>
                            {teacher.fullName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium">
                            {teacher.fullName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {teacher.email}
                        </p>
                    </div>
                </div>
                {teacher.profile?.school && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <SchoolIcon className="w-4 h-4 text-green-600" />
                        <span>{teacher.profile?.school?.name}</span>
                    </div>
                )}
            </div>
            <TeacherActions teacher={teacher} />
        </div>
    );
}
