import { CreateSolarUnitForm } from "./components/CreateSolarUnitForm";


export default function SolarUnitCreatePage() {


    return (
        <main className="mt-4 max-w-5xl">
      <h1 className="text-4xl font-bold text-foreground">Create Solar Unit</h1>
      <p className="text-gray-600 mt-2">Create a new solar unit</p>
      <div className="mt-8 bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6">
        <CreateSolarUnitForm />
      </div>
    </main>
    );
}
