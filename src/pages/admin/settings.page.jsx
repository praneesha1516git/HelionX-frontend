
import {SettingsTab} from "../admin/components/SettingsTab.jsx";

export default function AdminPage()  {
    return (
        <main className="mt-4">
            <h1 className="text-4xl font-bold text-foreground">Settings</h1>
            <p className="text-gray-600 mt-2" > Configure admin panel and system-wide settings</p>
           <div className="mt-8">
            <SettingsTab />
           </div>
        </main>
    )
}