import { useGetAllUsersQuery } from "@/lib/redux/query";
import { AdminAnomalyPieChart } from "./components/AdminAnomalyPieChart";
import { AdminAnomalyList } from "./components/AdminAnomalyList.jsx";
import AdminAnomalyTrends from "./components/AdminAnomalyTrends.jsx";

const AnomaliesPage = () => {
  const { data: users } = useGetAllUsersQuery();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-200">
      {/* soft background accents */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute top-10 right-0 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-emerald-200/25 blur-3xl" />
      </div> */}

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
             Anomalies
          </h1>
          <p className="text-gray-600">
            View anomalies across all users
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AdminAnomalyPieChart />
          <AdminAnomalyTrends />
          {/* spacer card or future summary */}
          <div className="hidden md:block" />
        </div>

        <AdminAnomalyList />
      </main>
    </div>
  );
};

export default AnomaliesPage;
