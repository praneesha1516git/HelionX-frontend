import { useGetSolarUnitByIdQuery } from "@/lib/redux/query";
import { useNavigate, useParams } from "react-router";
import { EditSolarUnitForm } from "./components/EditSolarUnitForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SolarUnitEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: solarUnit,
    isLoading: isLoadingSolarUnit,
    isError: isErrorSolarUnit,
    error: errorSolarUnit,
  } = useGetSolarUnitByIdQuery(id);

  if (isLoadingSolarUnit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0f4f8] via-[#d9e8f5] to-[#e8f0f7]">
        <div className="bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl px-6 py-4 text-gray-700">
          Loading solar unit...
        </div>
      </div>
    );
  }

  if (isErrorSolarUnit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0f4f8] via-[#d9e8f5] to-[#e8f0f7]">
        <div className="bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl px-6 py-4 text-red-700">
          Error: {errorSolarUnit?.data?.message || "Failed to load solar unit data."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#f0f4f8] via-[#d9e8f5] to-[#e8f0f7]">
     

      <main className="relative   px-4 py-0 ">
        <div className=" p-6 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/solar-units")}
            className="gap-2 w-fit text-gray-600 hover:text-gray-900 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Solar Units
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Solar Unit</h1>
          <p className="text-gray-600">Update the details of the solar unit</p>
        </div>

        <div className="bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">
          <EditSolarUnitForm solarUnit={solarUnit} />
        </div>
      </main>
    </div>
  );
}
