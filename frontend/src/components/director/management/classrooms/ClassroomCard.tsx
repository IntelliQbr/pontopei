import { Progress } from "@/components/ui/progress";
import { classPeriodsLabels } from "@/data/classroom.data";
import { Classroom } from "@/models/interfaces/classroom/classroom.interface";
import { format } from "date-fns";
import { ClockIcon, SchoolIcon, ShapesIcon } from "lucide-react";
import { ClassroomActions } from "./ClassroomActions";

interface ClassroomCardProps {
    classroom: Classroom;
}

export function ClassroomCard({ classroom }: ClassroomCardProps) {
    return (
        <div className="bg-background rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <ShapesIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                        <h3
                            title={classroom.name}
                            className="font-semibold text-gray-900 max-w-[250px] sm:max-w-[200px] md:max-w-[150px] lg:max-w-[220px] xl:max-w-[350px] 2xl:max-w-[250px] truncate"
                        >
                            {classroom.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                Série: {classroom.grade}
                            </span>
                            <div className="flex items-center gap-1 text-sm">
                                <ClockIcon className="w-3 h-3" />
                                <span>
                                    {classPeriodsLabels[classroom.period]}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <ClassroomActions classroom={classroom} />
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <SchoolIcon className="w-4 h-4 text-purple-500" />
                <span>{classroom.school.name}</span>
            </div>
            <div className="mt-4 text-sm text-gray-600">
                Criada em: {format(classroom.createdAt, "dd/MM/yyyy")}
            </div>
            <div className="flex flex-col items-start text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-2 w-full">
                    <Progress
                        value={
                            (100 / classroom.capacity) *
                            classroom.assignments.length
                        }
                        className="w-full h-2 bg-purple-100 border border-purple-300"
                        progressClassName="bg-purple-500"
                    />
                </div>
            </div>
        </div>
    );
}
