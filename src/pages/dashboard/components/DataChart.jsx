"use client"
import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { format , toDate } from "date-fns"
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


const DataChart = ({solarUnitId}) => {

    const [selectedRange, setSelectedRange] = useState("7");

    const {data , isLoading , isError , error} = useGetEnergyGenerationRecordsBySolarUnitQuery({
    id : solarUnitId,
    groupBy : "date",
    limit : parseInt(selectedRange),
  }
  );

    const handleRangeChange = (range) => {
      setSelectedRange(range);
    };

    if (isLoading) return null;

    if(!data || isError) return null;

    // Prepare data for the chart based on the selected range
   const lastSelectedRangeDaysEnergyProduction = data
    .slice(0, parseInt(selectedRange))
    .map((el) => {
      return {
        date: format(toDate(el._id.date), "MMM d"),
        energy: el.totalEnergy,
      };
    });

    const chartConfig = {
      energy: {
        label: "Energy (kWh)",
        color: "var(--chart-2)",
      }
     
    }


console.log("chart data" , lastSelectedRangeDaysEnergyProduction);

  return (
    <Card className="w-full h-120 rounded-xl">
      <CardHeader>
        <CardTitle>Energy Production Chart</CardTitle>
        <CardDescription>
          Showing energy production over the past {selectedRange} days .
        </CardDescription>
   
        
       <div className="flex justify-end mt-[-40px]">
        
        <div className="flex  w-4 h-4 text-gray-400  ">
        <Funnel className=""/>
        </div>
        <Select value= {selectedRange} onValueChange={handleRangeChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="7">Per Week</SelectItem>
            <SelectItem value="30">Per Month</SelectItem>
        </SelectContent>
        </Select>
       </div>
       
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
            <div style={{ width: "100%", height: "50%" , marginTop: "20px" }}>

          <ResponsiveContainer>
            <AreaChart
              data={lastSelectedRangeDaysEnergyProduction}
              margin={{
                left: 20,
                right: 40,
                bottom: 20,
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