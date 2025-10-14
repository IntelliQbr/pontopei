import { cn } from "@/lib/utils";
import { StatCard as StatCardProps } from "@/models/interfaces/stats/stat-card.interface";

export function StatCard({
    title,
    value,
    icon,
    className,
    iconClassName,
}: StatCardProps) {
    return (
        <div
            className={cn(
                "rounded-lg shadow-sm p-6 border border-gray-200",
                className
            )}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={cn("p-3 rounded-lg", iconClassName)}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
