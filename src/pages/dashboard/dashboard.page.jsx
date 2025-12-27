import { useGetSolarUnitForUserQuery } from "@/lib/redux/query";
import DataChart from "./components/DataChart";
import { CFBarChart } from "./components/CFBarChart";
import { WeatherCard } from "./components/WeatherCard";
import { useUser } from "@clerk/clerk-react";
import house from "./components/house16.png";
import { Sun, Moon, Zap, Activity, Download, Settings, CloudSun, Wind, Droplets } from 'lucide-react';
import { useState } from 'react';

const DashboardPage = () => {
  const { user, isLoaded } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch the solar unit associated with the logged-in Clerk user
  const {
    data: rawSolarUnitData,
    isLoading: isLoadingSolarUnit,
    isError: isErrorSolarUnit,
    error: errorSolarUnit,
  } = useGetSolarUnitForUserQuery();

  const solarUnit = Array.isArray(rawSolarUnitData)
    ? rawSolarUnitData[0]
    : rawSolarUnitData;

  const isActive = (solarUnit?.status || "").toUpperCase() === "ACTIVE";

  if (isLoadingSolarUnit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-800 text-xl">Loading...</div>
      </div>
    );
  }

  if (isErrorSolarUnit) {
    console.error("getSolarUnitForUser error:", errorSolarUnit);
    const status =
      errorSolarUnit?.status ||
      errorSolarUnit?.originalStatus ||
      "unknown";
    const data = errorSolarUnit?.data || errorSolarUnit?.error || null;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 p-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-300 max-w-2xl">
          <div className="text-gray-800 text-xl mb-4">
            Error loading solar unit (status: {String(status)})
          </div>
          <pre className="text-gray-600 text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  console.log("Solar Unit:", solarUnit);
  console.log("Solar Unit ID in DashboardPage:", solarUnit.serialNumber);

  return (
    <div className="min-h-screen relative overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 flex items-start justify-center pt-0 ">
        <img
          src={house}
          alt="Solar house background"
          className="w-[85vw] h-[60vw] object-contain rounded-2xl"
          style={{ transformOrigin: "center top" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-6">
        {/* Top Bar with Weather */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex flex-col items-start gap-2">
            {/* User Info */}
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-2xl px-5 py-3 border border-gray-300/50 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {user?.firstName?.[0]}
              </div>
              <div>
                <div className="text-gray-800 font-semibold text-sm">
                  {user?.firstName}'s House
                </div>
                <div className="text-gray-500 text-xs">Solar Dashboard</div>
              </div>
            </div>

            {/* Active badge */}
            {isActive && (
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-green-100 rounded-md shadow-md">
                <span className="h-2.5 w-2.5 rounded-2xl bg-green-500" aria-hidden />
                <span className="text-sm font-semibold text-gray-600">Unit Active</span>
              </div>
            )}
          </div>

          {/* Compact Weather Widget */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-2xl px-5 py-3 border border-gray-300/50 shadow-lg">
            <div className="flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-orange-500" />
              <div>
                <div className="text-gray-500 text-xs">Weather</div>
                <div className="text-gray-800 font-bold text-lg">30°C</div>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-gray-500 text-xs">Wind</div>
                <div className="text-gray-800 font-semibold text-sm">9 m/s</div>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-500" />
              <div>
                <div className="text-gray-500 text-xs">Humidity</div>
                <div className="text-gray-800 font-semibold text-sm">60%</div>
              </div>
            </div>
          </div>

          {/* Unit ID */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-5 py-3 border border-gray-300/50 shadow-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-gray-500 text-xs">Unit ID</div>
                <div className="text-gray-800 font-mono text-sm font-semibold">
                  {solarUnit.serialNumber}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6 mt-[45%] max-w-7xl mx-auto">
          {/* Energy Production Chart */}
          <div className="">
            <DataChart solarUnitId={solarUnit._id} />
          </div>

          {/* Capacity Factor Chart */}
          <div className="">
            <CFBarChart solarUnitId={solarUnit._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
