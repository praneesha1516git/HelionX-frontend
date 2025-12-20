"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, Hash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUserAnomaliesQuery } from "@/lib/redux/query";

const severityStyles = {
  HIGH: "bg-red-100 text-red-700 border-red-200",
  MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
  LOW: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export function AnomalyList({ solarUnitId }) {
  const { data: anomalies, isLoading, isError } = useGetUserAnomaliesQuery({
    id: solarUnitId,
  });
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    if (!anomalies) return [];
    const cutoff = Date.now() - 24 * 60 * 60 * 1000; // last 24 hours
    return anomalies
      .filter((a) => {
        const ts = a.detectionTimestamp ? new Date(a.detectionTimestamp).getTime() : 0;
        return ts >= cutoff;
      })
      .filter((a) => {
        if (severityFilter === "ALL") return true;
        return a.severity === severityFilter;
      });
  }, [anomalies, severityFilter]);

  useEffect(() => {
    setSeverityFilter("ALL");
  }, []);

  useEffect(() => {
    setPage(1);
  }, [severityFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paged = filtered.slice(start, end);

  if (isLoading) {
    return (
      <Card className="w-full bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardContent className="p-6 text-center text-sm text-gray-600">Loading anomalies...</CardContent>
      </Card>
    );
  }

  if (isError || !anomalies) {
    return null;
  }

  return (
    <Card className="w-full bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl">
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <CardTitle className="text-gray-900">Anomalies</CardTitle>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Severity:</span>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All severities</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filtered.length === 0 ? (
          <div className="py-6 text-sm text-muted-foreground">No anomalies found for this filter.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-gray-600">
                  <tr className="border-b border-white/30">
                    <th className="py-2 pr-4">Type</th>
                    <th className="py-2 pr-4">Description</th>
                    <th className="py-2 pr-4">Severity</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Solar Unit</th>
                    <th className="py-2 pr-4">Detected</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((item) => {
                    const severityClass = severityStyles[item.severity] || severityStyles.LOW;
                    const statusLabel = item.resolvedStatus ? "Resolved" : "Active";
                    return (
                      <tr key={item._id || item.id} className="border-b border-white/20">
                        <td className="py-3 pr-4 text-gray-900">{item.anomalyType || "Anomaly"}</td>
                        <td className="py-3 pr-4 text-gray-900">
                          {item.description || item.anomalyName || item.anomayName || item.anomalyType || "Anomaly"}
                        </td>
                        <td className="py-3 pr-4">
                          <Badge className={`border ${severityClass}`}>{item.severity || "N/A"}</Badge>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                            {statusLabel}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4 text-gray-700">
                          <span className="inline-flex items-center gap-1">
                            <Hash className="h-4 w-4 text-blue-600" />
                            {item.solarUnitId || "Solar Unit"}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-gray-700">
                          {item.detectionTimestamp
                            ? formatDistanceToNow(new Date(item.detectionTimestamp), { addSuffix: true })
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <span>
                Showing {(start + 1).toLocaleString()}-{Math.min(end, filtered.length).toLocaleString()} of{" "}
                {filtered.length.toLocaleString()}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <span className="px-2">
                  Page {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
