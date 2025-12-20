"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAnomalyTrendsQuery,
  useGetAdminAnomalyTrendsQuery,
} from "@/lib/redux/query";

const buildLabel = (item, range) => {
  if (!item?._id) return "—";
  if (range === "daily") {
    const parsed = parseISO(item._id.date || "");
    return isNaN(parsed) ? "—" : format(parsed, "MMM d");
  }
  if (range === "weekly") {
    return item._id.week ? `W${item._id.week}` : "—";
  }
  const parsed = parseISO((item._id.month || "") + "-01");
  return isNaN(parsed) ? "—" : format(parsed, "MMM yyyy");
};

const defaultLimit = { daily: 30, weekly: 26, monthly: 12 };

export default function AnomalyTrends({ admin = false, solarUnitId }) {
  const [range, setRange] = useState("daily");
  const limit = defaultLimit[range];

  const queryArgs = useMemo(
    () => ({
      groupBy: range,
      limit,
      ...(solarUnitId ? { solarUnitId } : {}),
    }),
    [range, limit, solarUnitId]
  );

  const { data, isLoading, isError } = admin
    ? useGetAdminAnomalyTrendsQuery(queryArgs)
    : useGetAnomalyTrendsQuery(queryArgs);

  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((item) => ({
      label: buildLabel(item, range),
      count: item.count ?? 0,
    }));
  }, [data, range]);

  return (
    <Card className="w-full bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl">
      <CardHeader className="flex items-center justify-between gap-3">
        <div>
          <CardTitle className="text-gray-900">Anomaly Trends</CardTitle>
          <CardDescription>Counts of anomalies over time</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gray-500" />
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-[150px] border border-white/20">
              <SelectValue placeholder="Daily" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-72">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-600">
            Loading anomaly trends...
          </div>
        ) : isError ? (
          <div className="h-full flex items-center justify-center text-sm text-red-600">
            Unable to load trends
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-600">
            No anomaly data found for this range
          </div>
        ) : (
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 8, right: 24, left: 0, bottom: 12 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tickMargin={8} />
              <YAxis allowDecimals={false} tickMargin={8} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
