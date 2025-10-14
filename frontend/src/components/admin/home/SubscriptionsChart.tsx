"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { AdminMetricsApi } from "@/api/admin-metrics.api";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { adminSubscriptionsChartConfig } from "@/data/admin.data";
import { useQuery } from "@tanstack/react-query";

export function SubscriptionsChart() {
	const { data, isLoading } = useQuery({
		queryKey: ["subscriptions-chart"],
		queryFn: () => AdminMetricsApi.getSubscriptionsChart(),
	});

	if (isLoading)
		return <Skeleton className="min-h-[200px] max-h-[80%] h-full w-full" />;

	return (
		<ChartContainer
			config={adminSubscriptionsChartConfig}
			className="min-h-[200px] max-h-[80%] h-full w-full"
		>
			<BarChart accessibilityLayer data={data}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="month"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Bar dataKey="amount" fill="#2563eb" radius={4} />
				<Bar dataKey="total" fill="#60a5fa" radius={4} />
				<YAxis
					axisLine={false}
					tickLine={false}
					tickFormatter={(value) =>
						value.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
						})
					}
				/>
			</BarChart>
		</ChartContainer>
	);
}
