import { Skeleton } from "@/components/ui/skeleton";
import { format, toDate } from "date-fns";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import { useState } from "react";
import { useSelector } from "react-redux";
import {detectAnomalies , getAnomalyStats} from "@/lib/anomalyDetection";
import EnergyProductionCards from "./EnergyProductionCards";
import EnergyTab from "./EnergyTab";
import { Card } from "@/components/ui/card";



const DataCard = ({ solarUnitId, title }) => {

   // Change this to switch between different detection methods
  // Options: 'windowAverage', 'absolute', 'combined'
  const [detectionMethod , setDetectionMethod] = useState("windowAverage");

  //Adjust these thresholds to demonstrate different sensitivity levels
  const [thresholdPercent , setThresholdPercent] = useState(40);
  const [absoluteMin , setAbsoluteMin] = useState(5);

  const tabs = [
    {label: "All", value: "all"},
    {label: "Anomaly", value: "anomaly"}
  ];

  // Get the selected tab from the Redux store
  const selectedTab = useSelector((state) => state.ui.selectedDashboardTab);

    // Fetch data using the RTK Query hook
    const {data , isLoading, isError, error} =
    useGetEnergyGenerationRecordsBySolarUnitQuery({
      id: solarUnitId,
      groupBy: "date",
      limit: 7,
    });

    if(isLoading) {
      return <Skeleton className="w-full h-48 rounded-md"/>;
    }

    if(!data || isError) {
      return <div>Error: {error.message}</div>;
    }
 
    console.log("Original Data:", data);

    const last7Days = data;

    const dataWithAnomalies = detectAnomalies(last7Days, detectionMethod, {
      windowThresholdPercent: thresholdPercent,
      absoluteThreshold: absoluteMin
    });

  const energyProductionData = dataWithAnomalies.map((el) => {
    return {
      day: format(toDate(el._id.date), "EEE"),
      date: format(toDate(el._id.date), "MMM d"),
      Production: el.totalEnergy,
      hasAnomaly: el.hasAnomaly,
      anomalyType: el.anomalyType,
      anomalyReason: el.anomalyReason
    };
  });

   const filteredData = energyProductionData.filter((el) => {
    if(selectedTab === "all") {
      return true;
    } else if(selectedTab === "anomaly") {
      return el.hasAnomaly;
    }
  });

  const stats = getAnomalyStats(dataWithAnomalies);
  console.log("Anomaly Stats:", stats);
  console.log('detecttion menthod', detectionMethod);
  console.log('data with anomalies', dataWithAnomalies);






  return (
   <Card className="rounded-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {title}
          </h2>
          <p className="text-gray-600">Daily energy output for the past 7 days</p>
        </div>

        {/* Detection Method Selector - for teaching demonstrations */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium">Detection Method:</label>
            <select
              value={detectionMethod}
              onChange={(e) => setDetectionMethod(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
         
              <option value="windowAverage">Window Average (7-day)</option>
              <option value="absolute">Absolute Threshold</option>
            
            </select>
          </div>

          {/* Threshold Controls  */}
          {detectionMethod === 'windowAverage' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-medium">
                Threshold: {thresholdPercent}% below average
              </label>
              <input
                type="range"
                min="20"
                max="60"
                value={thresholdPercent}
                onChange={(e) => setThresholdPercent(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}

          {/* Absolute Minimum Threshold Control */}
          {detectionMethod === 'absolute' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-medium">
                Minimum: {absoluteMin} kWh
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={absoluteMin}
                onChange={(e) => setAbsoluteMin(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Anomaly Statistics - shows detection results */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Window Average:</span> {stats.windowAverage} kWh
              {' | '}
              <span className="font-semibold">Range:</span> {stats.minEnergy} - {stats.maxEnergy} kWh
            </p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Anomalies:</span>{' '}
              <span className={stats.anomalyCount > 0 ? 'text-red-600 font-bold' : 'text-green-600'}>
                {stats.anomalyCount}
              </span>
              {' '}out of {stats.totalRecords} days ({stats.anomalyRate})
            </p>
          </div>
        </div>
      </div>

      {/* Tab Filters */}
      <div className="mb-4 flex items-center gap-x-4">
        {tabs.map((tab) => {
          return <EnergyTab key={tab.value} tab={tab} />;
        })}
      </div>

      {/* Energy Production Cards with Anomaly Detection */}
      <EnergyProductionCards energyProductionData={filteredData} />
    </Card>
  );
};

export default DataCard;