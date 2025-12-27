import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Lock, Database } from "lucide-react";

export function SettingsTab() {
  const [settings, setSettings] = useState({
    appName: "Aelora Admin",
    maintenanceMode: false,
    emailNotifications: true,
    logRetention: "30",
  });

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // TODO: Implement API call to save settings
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl space-y-6">
    

      {/* General Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
        </div>
        <Separator className="border-white/40" />
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Application Name
            </label>
            <Input
              value={settings.appName}
              onChange={(e) => handleChange("appName", e.target.value)}
              placeholder="Enter application name"
            />
          </div>
          <div className="flex items-center justify-between p-3 border border-white/30 rounded-lg bg-white/30">
            <div>
              <p className="font-medium text-gray-900">Maintenance Mode</p>
              <p className="text-sm text-gray-600">
                Disable access for regular users
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => handleChange("maintenanceMode", e.target.checked)}
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        </div>
        <Separator className="border-white/40" />
        <div className="flex items-center justify-between p-3 border border-white/30 rounded-lg bg-white/30">
          <div>
            <p className="font-medium text-gray-900">Email Notifications</p>
            <p className="text-sm text-gray-600">
              Receive email alerts for system events
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => handleChange("emailNotifications", e.target.checked)}
            className="w-5 h-5"
          />
        </div>
      </div>

      {/* Data */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900">Data</h3>
        </div>
        <Separator className="border-white/40" />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Log Retention (days)
          </label>
          <Input
            type="number"
            value={settings.logRetention}
            onChange={(e) => handleChange("logRetention", e.target.value)}
            placeholder="Enter days"
          />
          <p className="text-xs text-gray-600">
            Logs older than this duration will be automatically deleted
          </p>
        </div>
      </div>

      {/* Security */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">Security</h3>
        </div>
        <Separator className="border-white/40" />
        <div className="space-y-3">
          <Button variant="outline" className="w-full border-white/40">
            Reset Admin Passwords
          </Button>
          <Button variant="outline" className="w-full border-white/40">
            View Audit Logs
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" className="border-white/40">Cancel</Button>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">Save Settings</Button>
      </div>
    </Card>
  );
}
