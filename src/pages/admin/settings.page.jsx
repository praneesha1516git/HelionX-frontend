
import {SettingsTab} from "../admin/components/SettingsTab.jsx";

export default function AdminPage()  {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#f0f4f8] via-[#d9e8f5] to-[#e8f0f7]">
      {/* soft background accents */}
      
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10 space-y-2">
       
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mb-8">Configure admin panel and system-wide settings</p>
    
        
          <SettingsTab />
        
      </main>
    </div>
  )
}
