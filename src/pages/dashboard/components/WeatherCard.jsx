import { useGetWeatherDataQuery } from "@/lib/redux/query"; 
import { Card } from "@/components/ui/card";
import { Sun, Wind, Droplets } from 'lucide-react';

export const WeatherCard = () => {
 
    const { data:weatherData, isLoading, isError, error } = useGetWeatherDataQuery();
    if(isLoading) {
        return <div>Loading weather data...</div>;
    }

    if(isError) {
        console.error("getWeatherData error:", error);
        const status = error?.status || (error?.originalStatus) || "unknown";
        const data = error?.data || error?.error || null;
        return (
          <div>
            <div>Error loading weather data (status: {String(status)})</div>
            <pre style={{whiteSpace: 'pre-wrap', marginTop: 8}}>{JSON.stringify(data, null, 2)}</pre>
          </div>
        );
    }
   

    
    return (

       // WeatherCard.jsx



    <div className="h-full flex flex-col rounded-2xl  ">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Sun className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-900">Current Weather</h3>
        </div>
        <p className="text-sm text-gray-500">Live conditions</p>
      </div>

      {/* Main Weather Display */}
      <div className="flex-1 px-6 pb-6">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
           
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-3 py-1 shadow-md">
              <span className="text-2xl font-bold text-gray-900">
                {parseInt(weatherData.current.temperature_2m)}°C
              </span>
            </div>
          </div>
        </div>

        {/* Weather Metrics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Wind className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Wind Speed</p>
                <p className="text-sm font-semibold text-gray-900">
                  {parseInt(weatherData.current.wind_speed_10m)} m/s
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Humidity</p>
                <p className="text-sm font-semibold text-gray-900">
                  {parseInt(weatherData.current.relative_humidity_2m)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
    
 
