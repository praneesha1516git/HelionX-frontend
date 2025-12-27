"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useGetSolarUnitsQuery } from "@/lib/redux/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusStyles = {
  ACTIVE: "border-green-200 text-green-700 bg-green-50",
  INACTIVE: "border-gray-200 text-gray-700 bg-gray-50",
  MAINTENANCE: "border-amber-200 text-amber-700 bg-amber-50",
};

export function SolarUnitsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const {
    data: solarUnits,
    isLoading: isLoadingSolarUnit,
    isError: isErrorSolarUnits,
    error: errorSolarUnit,
  } = useGetSolarUnitsQuery();

  const filteredUnits = useMemo(() => {
    if (!solarUnits) return [];
    return solarUnits
      .filter((unit) =>
        searchTerm
          ? unit.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .filter((unit) => {
        if (statusFilter === "ALL") return true;
        return unit.status === statusFilter;
      });
  }, [solarUnits, searchTerm, statusFilter]);

  useEffect(() => setPage(1), [searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUnits.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paged = filteredUnits.slice(start, end);

  if (isLoadingSolarUnit) {
    return (
      <Card className="w-full bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardContent className="p-6 text-center text-sm text-gray-600">Loading solar units...</CardContent>
      </Card>
    );
  }

  if (isErrorSolarUnits) {
    return (
      <Card className="w-full bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardContent className="p-6 text-sm text-red-600">
          Failed to load solar units {errorSolarUnit?.status ? `(status: ${errorSolarUnit.status})` : ""}.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl">
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <CardTitle className="text-gray-900">Solar Units</CardTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="Search by serial..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-52"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2 bg-black font-semibold">
            <Link to="/admin/solar-units/create" className="flex items-center gap-2">
              Add New Unit
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredUnits.length === 0 ? (
          <div className="py-6 text-sm text-muted-foreground">No solar units found.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-gray-600">
                  <tr className="border-b border-white/30">
                    <th className="py-2 pr-4">Serial</th>
                    <th className="py-2 pr-4">Capacity</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Installed</th>
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((unit) => {
                    const statusClass = statusStyles[unit.status] || statusStyles.INACTIVE;
                    return (
                      <tr key={unit._id} className="border-b border-white/20">
                        <td className="py-3 pr-4 text-gray-900">{unit.serialNumber}</td>
                        <td className="py-3 pr-4 text-gray-900">{unit.capacity} kW</td>
                        <td className="py-3 pr-4">
                          <Badge className={`border ${statusClass}`}>{unit.status}</Badge>
                        </td>
                        <td className="py-3 pr-4 text-gray-700">
                          {unit.installationDate
                            ? new Date(unit.installationDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="py-3 pr-4 text-gray-700">
                          <span className="font-mono text-xs">{unit._id}</span>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex gap-2">
                            <Button
                              className="bg-blue-600 text-white"
                              size="sm"
                              onClick={() => navigate(`/admin/solar-units/${unit._id}/edit`)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/admin/solar-units/${unit._id}`)}
                            >
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <span>
                Showing {(start + 1).toLocaleString()}-{Math.min(end, filteredUnits.length).toLocaleString()} of{" "}
                {filteredUnits.length.toLocaleString()}
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
