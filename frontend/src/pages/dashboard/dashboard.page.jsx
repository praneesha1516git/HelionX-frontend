//THIS is RTK query hook to fetch energy generation records for a solar unit
import { useGetSolarUnitForUserQuery } from "@/lib/redux/query";
import  DataChart  from "./components/DataChart";
import { useUser } from "@clerk/clerk-react";

const DashboardPage = () => {
   const { user , isLoaded } = useUser();
   
   // Fetch the solar unit associated with the logged-in Clerk user , data:solarUnit renaming data feteched from the query
   const {data: solarUnit , isLoading: isLoadingSolarUnit , isError: isErrorSolarUnit, error: errorSolarUnit} = useGetSolarUnitForUserQuery();


    if(isLoadingSolarUnit) {
      return <div>Loading...</div>;
    }

    if(isErrorSolarUnit) {
      return <div>Error: {errorSolarUnit.message}</div>;
    }
    console.log("Solar Unit:", solarUnit);

  return (
    <>
    <div className=" text-gray-800 m-4">
      <h1 className="font-bold text-4xl">{user?.firstName}'s House</h1>
      <div className="text-lg mt-3 text-gray-500 ">Welcome back to your Solar Energy Dashboard</div>


       <div className="mt-8 ">
        <DataChart
        solarUnitId = {solarUnit._id}/>
       </div>
      </div>
    </>
  );
};

export default DashboardPage;


