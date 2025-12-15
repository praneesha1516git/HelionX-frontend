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
        // Log full error for debugging (status, data, originalError)
        console.error("getSolarUnitForUser error:", errorSolarUnit);
        const status = errorSolarUnit?.status || (errorSolarUnit?.originalStatus) || "unknown";
        const data = errorSolarUnit?.data || errorSolarUnit?.error || null;
        return (
          <div>
            <div>Error loading solar unit (status: {String(status)})</div>
            <pre style={{whiteSpace: 'pre-wrap', marginTop: 8}}>{JSON.stringify(data, null, 2)}</pre>
          </div>
        );
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


