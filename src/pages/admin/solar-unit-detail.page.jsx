import { useParams, useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Zap,
  Calendar,
  Gauge,
  Activity,
  Settings,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Sun,
  MapPin,
} from "lucide-react";
import { useGetSolarUnitByIdQuery } from "@/lib/redux/query";

// Utility function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// Utility function to calculate days since installation
const getDaysSince = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  return diff;
};

export default function SolarUnitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: solarUnit,
    isLoading: isLoadingSolarUnit,
    isError: isErrorSolarUnit,
    error: errorSolarUnit,
  } = useGetSolarUnitByIdQuery(id);

  if (isLoadingSolarUnit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0f4f8] via-[#d9e8f5] to-[#e8f0f7]">
        <div className="bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl px-6 py-4 text-gray-700">
          Loading solar unit...
        </div>
      </div>
    );
  }

  if (isErrorSolarUnit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0f4f8] via-[#d9e8f5] to-[#e8f0f7]">
        <div className="bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl px-6 py-4 text-red-700">
          Error: {errorSolarUnit?.message || "Unable to load solar unit"}
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/admin/solar-units/${solarUnit._id}/edit`);
  };

  const handleDelete = () => {
    console.log("Delete solar unit:", solarUnit._id);
  };

  const isActive = solarUnit.status === "ACTIVE";
  const daysSinceInstallation = getDaysSince(solarUnit.installationDate);

  const highlightCards = [
    {
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      label: "System Capacity",
      value: `${solarUnit.capacity.toFixed(1)} kW`,
    },
    {
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
      label: "Installed",
      value: formatDate(solarUnit.installationDate),
    },
    {
      icon: <Activity className="w-5 h-5 text-blue-600" />,
      label: "Current Status",
      value: isActive ? "Generating" : "Offline",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#f0f4f8] via-[#d9e8f5] to-[#e8f0f7]">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute top-10 right-0 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-emerald-200/25 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 space-y-6">
        {/* Header */}
        <Card className="bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6">
          <div className="flex flex-col gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/solar-units")}
              className="gap-2 w-fit text-gray-600 hover:text-gray-900 hover:bg-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Solar Units
            </Button>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Sun className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{solarUnit.serialNumber}</h1>
                  <p className="text-gray-600 mt-1">Solar Energy Generation Unit</p>
                  <div className="flex items-center gap-2 text-gray-700 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Online for {daysSinceInstallation} days</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${
                    isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {isActive ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {isActive ? "Active" : "Inactive"}
                </div>
                <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Unit
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-4">
          {highlightCards.map((item, idx) => (
            <Card
              key={idx}
              className="bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl p-4 flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-white/60 border border-white/40">{item.icon}</div>
              <div>
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-lg font-semibold text-gray-900">{item.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border border-white/20 bg-white/40 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-white/30 flex items-center gap-3">
                <Gauge className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">System Overview</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl border border-white/30 bg-white/50">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Power Capacity</p>
                    <p className="text-4xl font-bold text-gray-900">{solarUnit.capacity.toFixed(1)}</p>
                    <p className="text-sm text-gray-600">kilowatts</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/30 bg-white/50">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Serial Number</p>
                    <p className="text-2xl font-bold text-gray-900 font-mono break-all">
                      {solarUnit.serialNumber}
                    </p>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border ${
                    isActive ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isActive ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">System Status: {solarUnit.status}</h3>
                      <p className="text-sm text-gray-700 mt-1">
                        {isActive
                          ? "This solar unit is operational and generating energy within normal parameters."
                          : "This solar unit is currently inactive. Review maintenance or connectivity status."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border border-white/20 bg-white/40 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-white/30 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Installation Details</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="p-4 rounded-xl border border-white/30 bg-white/50">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Installation Date</p>
                  <p className="text-2xl font-bold text-gray-900">{formatDate(solarUnit.installationDate)}</p>
                  <p className="text-sm text-gray-600">Operational for {daysSinceInstallation} days</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/50 rounded-lg border border-white/30">
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Unit ID</p>
                    <p className="text-sm font-mono text-gray-800 break-all">{solarUnit._id}</p>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg border border-white/30">
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-2">User ID</p>
                    <p className="text-sm font-mono text-gray-800 break-all">
                      {solarUnit.userId ?? "No user assigned"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border border-white/20 bg-white/40 backdrop-blur-xl shadow-2xl overflow-hidden sticky top-6">
              <div className="bg-blue-600 p-5 text-white font-bold flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Actions
              </div>
              <div className="p-5 space-y-3">
                <Button
                  onClick={handleEdit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 shadow-sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Unit Details
                </Button>

                <Button variant="outline" className="w-full border border-white/30 py-3">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>

                <Button variant="outline" className="w-full border border-white/30 py-3">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance Report
                </Button>

                <Separator className="my-4" />

                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="w-full border border-red-200 text-red-600 hover:bg-red-50 py-3"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Delete Unit
                </Button>
              </div>
            </Card>

            
          </div>
        </div>
      </div>
    </div>
  );
}
