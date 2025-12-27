import wind from "./wind-turbine-3.png";

import { ChevronRight , TriangleAlert } from "lucide-react";


export default function InfoCards() {
    return (
        <div className="flex p-4 m-4 mt-12  min-h-screen flex-col lg:flex-row ">

               {/* text card */}
           <div className="  flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-12 ">
            {/* warning */}
                <div className=" py-10 px-6 sm:px-8  lg:px-13 w-full h-8 flex items-center  gap-3">
                    <div className=" w-11 h-9 px-3  py-2 flex items-center rounded-lg bg-red-500">
                    <TriangleAlert className="text-white h-4  " /> 

                    </div>
                    <span className="text-base  sm:text-lg">Problem</span>    
                </div>
            

                <div className=" mx-auto max-w-lg lg:max-0">
                    <h2 className="mb-6 text-center text-2xl leading-tight font-bold text-gray-900 sm:mb-8 sm:text-3xl lg:text-left lg:text-4xl">Home solar systems can face reduced efficiency and missed savings due to panel shading, dirt, unexpected drops in output, or inverter 
                        issues. Stay ahead with instant anomaly alerts.</h2>

                <div className="space-y-3 sm:space-y-4">
                    
                    <div className="w-full h-6 flex items-center gap-2">
                    <ChevronRight className="text-red-400" /> 
                      <span className="text-base text-gray-700 sm:text-lg">Panel shading or dirt</span>    
                     </div>

                      <div className="w-full h-6 flex items-center gap-2">
                    <ChevronRight className="text-red-400" /> 
                      <span className="text-base text-gray-700 sm:text-lg">Unexpected drop in output</span>    
                     </div>

                    <div className="w-full h-6 flex items-center gap-2">
                    <ChevronRight className="text-red-400" /> 
                      <span className="text-base text-gray-700 sm:text-lg">Inverter Errors</span>    
                     </div>


                   <div className="w-full h-6 flex items-center gap-2">
                    <ChevronRight className="text-red-400" /> 
                      <span className="text-base text-gray-700 sm:text-lg">Missed maintenance reminders</span>    
                     </div>
                    </div>  

                    </div>
           </div>

            {/* image card */}
           <div className="flex-1 p-2 sm:p-4 ">
                <div className=" h-64  overflow-hidden rounded-3xl sm:h-80 md:h-160 " >
                    <img  alt="wind turbine image" width="600" height="400" className="object-cover w-full h-full" src={wind}/>
                </div>
           </div>

         
        </div>

    )}