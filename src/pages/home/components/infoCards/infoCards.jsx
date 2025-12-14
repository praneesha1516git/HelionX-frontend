import wind from "./wind-turbine-2.png";
import Construction   from  "./solar-construction.webp";


export default function InfoCards() {
    return (
        <div className="flex p-4 m-4 min-h-screen flex-col lg:flex-row ">
            {/* image card */}
           <div className="flex-1 p-2 sm:p-4">
                <div className=" h-64  overflow-hidden rounded-3xl sm:h-80 md:h-full " >
                    <img  alt="wind turbine image" width="800" height="600" className="object-cover w-full h-full" src={wind}/>
                </div>
           </div>

            {/* text card */}
           <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-12 ">
                <div className=" mx-auto max-w-lg lg:max-0">
                    <h2 className="mb-6 text-center text-3xl leading-tight font-bold text-gray-900 sm:mb-8 sm:text-4xl lg:text-left lg:text-5xl">Your Solar Energy Generation</h2>
                    <p className="mb-8 text-center  text-gray-700 sm:mb-12 sm:text-lg lg:text-left">This month, your solar panels generated <span className="font-semibold text-blue-600">X kWh</span> of clean energy, helping you save on electricity bills and reduce your carbon footprint. Track your energy production trends and see how much power you contribute back to the grid.</p>

                   <div className=" h-44 w-64 flex overflow-hidden rounded-3xl"> 
                    <img src={Construction} alt="" width="300" height="600" className="object-fit w-full h-full" />
                   </div>
                </div>
           </div>
        </div>

    )}