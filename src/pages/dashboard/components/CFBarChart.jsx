import { TrendingUp , Funnel } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis ,YAxis} from "recharts"
import {useState} from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { format, parseISO,toDate } from "date-fns"
import { useGetCapacityFactorDataQuery } from "@/lib/redux/query"
import ChartSkeleton from "./ChartSkeleton";

export const CFBarChart = ({solarUnitId}) => {
  console.log("Solar Unit ID in CFBarChart:", solarUnitId);
  
  const [selectedRange, setSelectedRange] = useState("7");

  const {data:capacityData , isLoading , isError , error} = useGetCapacityFactorDataQuery({
    id : solarUnitId,
    groupBy : "date",
    limit : parseInt(selectedRange),
  });

  
  const handleRangeChange = (range) => {
    setSelectedRange(range);
  }
  
  if (isLoading) {
    return (
      <ChartSkeleton
        title="Capacity Factor"
        description="Monitor your solar panel's efficiency"
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
  
  if (!capacityData || isError) return <div>Error: {error.message}</div>;
  
  const lastSelectedRangeDaysCapacityFactor = capacityData
  .slice(0, parseInt(selectedRange))
  .map((el) => {
    return {
      date: format(toDate(el.date), "MMM d"),
      capacityFactor: el.capacityFactor,
    };
  });
  
  const chartConfig = {
    capacityFactor: {
      label: `Capacity Factor(%)`,
      color: "var(--chart-1)",
    },
  } 

console.log("Capacity Factor Data:", lastSelectedRangeDaysCapacityFactor);

  return (
    <Card className="w-full h-[50vh] rounded-xl bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle>Capacity Factor</CardTitle>
        <CardDescription>Monitor your solar panel's efficiency</CardDescription>

 <div className="flex justify-end mt-[-40px]">
        
        <div className="flex  w-4 h-4 text-gray-400  ">
        
        </div>
        <Select value= {selectedRange} onValueChange={handleRangeChange} >
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          
            <SelectItem value="7">Weekly</SelectItem>
            <SelectItem value="30">Monthly</SelectItem>
        </SelectContent>
        </Select>
       </div>
      </CardHeader>
      
     <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={lastSelectedRangeDaysCapacityFactor}
            margin={{
                left: 20,
                right: 40,
                bottom: 20,
              }}
            barSize={selectedRange === "7" ? 50 : 30}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
               label={{ value: "Date", position: "insideBottom", offset: -15 }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
              <YAxis
              dataKey="capacityFactor"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              label={{ value: "capacityFactor %", angle: -90, position: "insideLeft" }}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent  />}
            />
            <Bar dataKey="capacityFactor" fill="var(--chart-2)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-sm text-gray-500">
        Capacity Factor Shows the Solar Panel's Efficiency <TrendingUp className="h-4 w-4" />
        </div>
        
      </CardFooter> */}
    </Card>
  )
}
