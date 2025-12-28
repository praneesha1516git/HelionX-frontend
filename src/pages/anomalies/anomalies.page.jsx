import { useGetSolarUnitForUserQuery } from "@/lib/redux/query";
import DataCard from "./components/DataCard";
import { useUser } from "@clerk/clerk-react";
import { AnomalyPieChart } from "./components/AnomalyPieChart";
import { AnomalyList } from "./components/AnomalyList";
import AnomalyTrends from "./components/anomalyTrends";

const AnomaliesPage = () => {
  const { user, isLoaded } = useUser();

  const { data: solarUnit, isLoading: isLoadingSolarUnit, isError: isErrorSolarUnit, error: errorSolarUnit } = useGetSolarUnitForUserQuery();

  if (isLoadingSolarUnit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0f4f8] via-[#d9e8f5] to-[#e8f0f7]">
        <div className="text-gray-700 text-lg">Loading...</div>
      </div>
    );
  }

  if (isErrorSolarUnit) {
    console.error("getSolarUnitForUser error:", errorSolarUnit);
    const status = errorSolarUnit?.status || (errorSolarUnit?.originalStatus) || "unknown";
    const data = errorSolarUnit?.data || errorSolarUnit?.error || null;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0f4f8] via-[#d9e8f5] to-[#e8f0f7] px-6">
        <div className="bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 max-w-2xl w-full">
          <div className="text-red-600 text-lg font-semibold mb-3">
            Error loading solar unit (status: {String(status)})
          </div>
          <pre className="bg-white/70 border border-white/40 rounded-lg p-4 text-sm text-gray-800 overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  console.log(solarUnit);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#f0f4f8] via-[#d9e8f5] to-[#e8f0f7]">
      {/* soft background accents */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute top-10 right-0 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-emerald-200/25 blur-3xl" />
      </div> */}

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
             Anomalies
          </h1>
          <p className="text-gray-600">
            Live anomaly insights for your solar unit
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6   ">
          <AnomalyPieChart solarUnitId={solarUnit._id} />
          <AnomalyTrends solarUnitId={solarUnit._id} />
          {/* spacer card or future summary */}
          <div className="hidden md:block" />
        </div>

        <AnomalyList solarUnitId={solarUnit._id} />
      </main>
    </div>
  );
};

export default AnomaliesPage;
