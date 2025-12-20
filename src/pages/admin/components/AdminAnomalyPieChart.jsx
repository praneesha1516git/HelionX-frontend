"use client"
import { Pie, PieChart } from "recharts"
import { useGetAllAnomaliesQuery } from "@/lib/redux/query"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,

} from "@/components/ui/chart"

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

const RADIAN = Math.PI / 180;

export function AdminAnomalyPieChart() {
  const { data: anomalies, isLoading, isError, error } = useGetAllAnomaliesQuery();

  if (isLoading) {
    return (
      <Card className="flex flex-col bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardContent className="p-6 text-center text-sm text-gray-600">Loading anomalies...</CardContent>
      </Card>
    );
  }

  if (isError || !anomalies) {
    return (
      <Card className="flex flex-col bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardContent className="p-6 text-sm text-red-600">
          Failed to load anomalies {error?.status ? `(status: ${error.status})` : ""}.
        </CardContent>
      </Card>
    );
  }

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const recentAnomalies = anomalies.filter((a) => {
    const ts = a.detectionTimestamp ? new Date(a.detectionTimestamp) : null;
    return ts && ts >= oneMonthAgo;
  });

  const counts = recentAnomalies.reduce((acc, a) => {
    const key = a.anomalyType || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(counts).map(([label, value], idx) => ({
    label,
    value,
    fill: COLORS[idx % COLORS.length],
  }));

  const chartConfig = Object.fromEntries(
    chartData.map((d, idx) => [
      d.label,
      { label: d.label, color: COLORS[idx % COLORS.length] },
    ])
  );

  if (!chartData.length) return null;

  const renderLabel = ({ cx, cy, midAngle, outerRadius, name }) => {
    const radius = outerRadius + 14;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#111827"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {name}
      </text>
    );
  };

  return (
    <Card className="flex flex-col bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-gray-900">Anomalies (last 30 days)</CardTitle>
        <CardDescription className="text-gray-600">Distribution by anomaly type</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart margin={{ top: 8, bottom: 8, left: 24, right: 24 }}>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              labelLine
              outerRadius="80%"
              label={renderLabel}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
