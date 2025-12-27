"use client"
import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { format, parseISO } from "date-fns"
import { Area, AreaChart, CartesianGrid, XAxis,YAxis, ResponsiveContainer } from "recharts"
import {Funnel } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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

import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import ChartSkeleton from "./ChartSkeleton";


const DataChart = ({solarUnitId}) => {

    const [selectedRange, setSelectedRange] = useState("1"); // "1" (24h), "7", "30"
    const isHourly = selectedRange === "1";
    const queryLimit = isHourly ? 24 : parseInt(selectedRange);

    const {data , isLoading , isError , error} = useGetEnergyGenerationRecordsBySolarUnitQuery({
      id : solarUnitId,
      groupBy : isHourly ? "hour" : "date",
      limit : queryLimit,
    });

    const handleRangeChange = (range) => {
      setSelectedRange(range);
    };

const ChartSkeleton = ({ title, description, children }) => (
  <Card className="w-full h-120 rounded-xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <div className="h-5 w-5 rounded bg-gray-200 animate-pulse" />
        <span className="text-gray-500">{title}</span>
      </CardTitle>
      <CardDescription className="text-gray-400">{description}</CardDescription>
      {children /* optional slot for filters/buttons so layout stays consistent */}
    </CardHeader>
    <CardContent>
      <div className="h-72 w-full rounded-xl bg-gradient-to-b from-gray-200/60 to-gray-100/40 overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_20px_20px,rgba(255,255,255,0.4),transparent_40%)]" />
        <div className="h-full flex items-end gap-2 px-6 pb-6">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-gray-300/80 animate-pulse"
              style={{ height: `${30 + (i % 4) * 10}%` }}
            />
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);


    if (isLoading) {
      return (
        <ChartSkeleton
          title="Energy Production Chart"
          description={`Showing energy production over the past ${selectedRange} days.`}
          controls={
            <div className="flex justify-end mt-[-40px]">
              <div className="flex w-4 h-4 text-gray-400">
                <Funnel />
              </div>
              <div className="w-[180px] h-10 ml-2 bg-gray-200 rounded animate-pulse" />
            </div>
          }
        />
      );
    }

    if(!data || isError) return null;

    // Prepare data for the chart based on the selected range
   const lastSelectedRangeDaysEnergyProduction = isHourly
    ? data
        .slice(0, queryLimit)
        .map((el) => ({
          date: `${String(el._id.hour).padStart(2, "0")}:00`,
          energy: el.totalEnergy,
        }))
    : data
        .slice(0, queryLimit)
        .filter((el) => el?._id?.date)
        .map((el) => {
          const parsed = parseISO(el._id.date)
          const safeDate = isNaN(parsed) ? new Date(el._id.date || "") : parsed
          return {
            date: isNaN(safeDate) ? "—" : format(safeDate, "MMM d"),
            energy: el.totalEnergy,
          }
        });

    const chartConfig = {
      energy: {
        label: "Energy (kWh)",
        color: "var(--chart-2)",
      }
     
    }


console.log("chart data" , lastSelectedRangeDaysEnergyProduction);



  return (
    <Card className="w-full h-[50vh] rounded-xl bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle>Energy Production Chart</CardTitle>
        <CardDescription>
           {isHourly ? "Energy production over the past 24 hours." : `Energy production over the past ${selectedRange} days.`}
        </CardDescription>
   
        
       <div className="flex justify-end mt-[-40px]">
        
        <div className="flex  w-4 h-4 text-gray-400  ">
       
        </div>
        <Select value= {selectedRange} onValueChange={handleRangeChange}>
        <SelectTrigger className="w-[180px] border border-white/20 ">
            <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Daily</SelectItem>
            <SelectItem value="7">Weekly</SelectItem>
            <SelectItem value="30">Monthly</SelectItem>
        </SelectContent>
        </Select>
       </div>
       
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig}>
            <div style={{ width: "100%", height: "80%" , marginTop: "20px" }}>

          <ResponsiveContainer >
            <AreaChart
              data={lastSelectedRangeDaysEnergyProduction}
              margin={{
                left: 20,
                right: 40,
                bottom: 20,
                top: 10,
              }}
            >

              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                label={{ value: "Date", position: "insideBottom", offset: -15 }}
                />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={10}
              label={{ value: "kWh", angle: -90, position: "insideLeft" }}
            />

              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.energy.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartConfig.energy.color} stopOpacity={0.1} />
                </linearGradient>
               
              </defs>
              
              <Area
                dataKey="energy"
                type="natural"
                fill="url(#fillDesktop)"
                fillOpacity={0.4}
                stroke="var(--chart-3)"
                stackId="a"
                />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default DataChart;
