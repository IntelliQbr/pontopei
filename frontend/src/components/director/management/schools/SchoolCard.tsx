import { School } from "@/models/interfaces/school/school.interface";
import { format } from "date-fns";
import { MapPinIcon, SchoolIcon } from "lucide-react";
import { SchoolActions } from "./SchoolActions";

interface SchoolCardProps {
    school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <SchoolIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h3
                            title={school.name}
                            className="font-semibold text-gray-900 max-w-[250px] sm:max-w-[200px] md:max-w-[150px] lg:max-w-[220px] xl:max-w-[350px] 2xl:max-w-[250px] truncate"
                        >
                            {school.name}
                        </h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <MapPinIcon className="h-3 w-3" />
                            <span
                                title={school.address}
                                className="truncate max-w-[250px] sm:max-w-[200px] md:max-w-[150px] lg:max-w-[220px] xl:max-w-[350px] 2xl:max-w-[250px]"
                            >
                                {school.address}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <SchoolActions school={school} />
                </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
                Criada em: {format(school.createdAt, "dd/MM/yyyy")}
            </div>
        </div>
    );
}
