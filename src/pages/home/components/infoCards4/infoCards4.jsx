import panel from "./sp.jpeg";
import Construction   from  "./solar-construction.webp";
import { ChevronRight ,Zap } from "lucide-react";


export default function InfoCards() {
    return (
        <div className="flex p-4 m-4 mt-12  min-h-screen flex-col lg:flex-row ">


         {/* image card */}
           <div className="flex-1 p-2 sm:p-4 ">
                <div className=" h-64  overflow-hidden rounded-3xl sm:h-80 md:h-160 " >
                    <img  alt="panel image" width="600" height="400" className="object-cover w-full h-full" src={panel}/>
                </div>
           </div>



               {/* text card */}
           <div className="mt-4 bg-gradient-to-br from-[#3fa8ff] to-[#0d6bff] rounded-3xl flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-12 sm:h-80 md:h-160 ">
        
                <div className="bg-lime-400 w-30 h-8 mb-4 rounded-md flex justify-center items-center ">
                  <Zap className="text-gray-900 w-4 h-4 justify-center"/><span className=" ml-2 font-size-md">Solution</span>
                </div>
          
      
                <div className=" mx-auto max-w-lg lg:max-0">
                    <h2 className="mb-6 text-center text-2xl leading-tight font-bold text-white sm:mb-8 sm:text-3xl lg:text-left lg:text-4xl">Home solar systems can face reduced efficiency and missed savings due to panel shading, dirt, unexpected drops in output, or inverter 
                        issues. Stay ahead with instant anomaly alerts.</h2>

                <div className="space-y-3 sm:space-y-4">
                    
                    <div className="w-full h-6 flex items-center gap-2">
                    <ChevronRight className="text-red-400" /> 
                      <span className="text-base text-white sm:text-lg">Panel shading or dirt</span>    
                     </div>

                      <div className="w-full h-6 flex items-center gap-2">
                    <ChevronRight className="text-red-400" /> 
                      <span className="text-base text-white sm:text-lg">Unexpected drop in output</span>    
                     </div>

                    <div className="w-full h-6 flex items-center gap-2">
                    <ChevronRight className="text-red-400" /> 
                      <span className="text-base text-white sm:text-lg">Inverter Errors</span>    
                     </div>


                   <div className="w-full h-6 flex items-center gap-2">
                    <ChevronRight className="text-red-400" /> 
                      <span className="text-base text-white sm:text-lg">Missed maintenance reminders</span>    
                     </div>
                    </div>  

                    </div>
           </div>

         

         
        </div>

    )}