import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGetAllInvoicesQuery , useGetAllUsersQuery } from "@/lib/redux/query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Receipt, 
  Calendar, 
  Zap, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function InvoicesPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: invoices, isLoading, isError, error } = useGetAllInvoicesQuery();
  console.log("Invoices data:", invoices);

  const { data: users , isError: isErrorUsers , isLoading: isLoadingUsers , error: errorUsers } = useGetAllUsersQuery();
  
  useEffect(() => {
    setPage(1);
  }, [statusFilter, userFilter]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="text-center bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl px-6 py-4 rounded-2xl">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-700 font-medium">Loading invoices...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    console.error("getInvoicesforUser error:", error);
    const status = error?.status || error?.originalStatus || "unknown";
    const data = error?.data || error?.error || null;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
        <div className="bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
          <div className="text-red-600 text-lg font-semibold mb-4">
            Error loading invoices (status: {String(status)})
          </div>
          <pre className="bg-white/50 p-4 rounded-lg text-sm text-gray-700 overflow-auto border border-white/20">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  }





  // Filter invoices based on status
  const filteredInvoices = statusFilter === "All" 
    ? invoices 
    : invoices?.filter(invoice => invoice.paymentStatus === statusFilter);

  const filteredByUser = userFilter === "All"
    ? filteredInvoices
    : filteredInvoices?.filter((invoice) => String(invoice.userId) === String(userFilter));

  // Get counts for each status
  const pendingCount = invoices?.filter(inv => inv.paymentStatus === "PENDING")?.length || 0;
  const paidCount = invoices?.filter(inv => inv.paymentStatus === "PAID")?.length || 0;

  const totalPages = Math.max(1, Math.ceil((filteredByUser?.length || 0) / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pagedInvoices = filteredByUser?.slice(start, end) || [];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-200">

   

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
             
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
                <p className="text-gray-600 mt-1">Manage your solar energy billing</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="border border-white/20 bg-white/40 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {invoices?.length || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Receipt className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-white/20 bg-white/40 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-3xl font-bold text-orange-600 mt-1">
                      {pendingCount}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-white/20 bg-white/40 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Paid</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">
                      {paidCount}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap items-center gap-3 bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-2xl border border-white/20">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter Invoices:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Invoices</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
              </SelectContent>
            </Select>

               <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Users</SelectItem>
                {users && users.map((user) => (
                  <SelectItem key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {statusFilter !== "All" && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setUserFilter("All")}
                className="text-sm"
              >
                Clear Filter
              </Button>
            )}
          </div>
        </div>

        {/* Invoices List */}
        {!filteredByUser || filteredByUser.length === 0 ? (
          <Card className="border border-white/20 bg-white/40 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-12 text-center">
              <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No {statusFilter !== "All" ? statusFilter.toLowerCase() : ""} invoices found
              </h3>
              <p className="text-gray-600">
                {statusFilter !== "All" 
                  ? `You don't have any ${statusFilter.toLowerCase()} invoices at the moment.`
                  : "You don't have any invoices yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-white/20 bg-white/40 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-left text-gray-600">
                    <tr className="border-b border-white/30">
                      <th className="py-3 pr-4 pl-4">Billing Period</th>
                      <th className="py-3 pr-4">Energy</th>
                      <th className="py-3 pr-4">Status</th>
                      <th className="py-3 pr-4">User</th>
                      <th className="py-3 pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedInvoices.map((invoice) => {
                      const isPaid = invoice.paymentStatus === "PAID";
                      return (
                        <tr key={invoice._id} className="border-b border-white/20">
                          <td className="py-3 pr-4 pl-4 text-gray-900">
                            {format(new Date(invoice.billingPeriodStart), "MMM d")} -{" "}
                            {format(new Date(invoice.billingPeriodEnd), "MMM d, yyyy")}
                          </td>
                          <td className="py-3 pr-4 text-gray-900">
                            {invoice.totalEnergyGenerated.toFixed(2)} kWh
                          </td>
                          <td className="py-3 pr-4">
                              <Badge
                                  className={`border ${
                                    isPaid
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : "bg-orange-50 text-orange-700 border-orange-200"
                                  }`}
                                >
                                  {invoice.paymentStatus}
                                </Badge>
                          </td>
                          <td className="py-3 pr-4 text-gray-700">
                            {invoice.userId || "—"}
                          </td>
                          <td className="py-3 pr-4">
                            <div className="flex gap-2">
                             
                              <Button
                                variant="outline"
                                onClick={() => navigate(`/dashboard/invoices/${invoice._id}/payment`)}
                                className="font-semibold"
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
              <div className="flex items-center justify-between text-sm text-gray-700 px-4 py-3">
                <span>
                  Showing {(start + 1).toLocaleString()}-{Math.min(end, filteredByUser.length).toLocaleString()} of{" "}
                  {filteredByUser.length.toLocaleString()}
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
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
