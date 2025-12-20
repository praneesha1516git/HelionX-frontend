import React, { useState } from 'react';
import { Sun, Moon, Zap, Battery, TrendingUp, Settings, Download, Share2, Maximize2, ChevronDown, Activity } from 'lucide-react';

export default function SolarDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-100">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-teal-800/40 to-green-900/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Main Content Grid */}
        <div className="p-6 pt-12 grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-2 space-y-4">
            {/* User Avatars */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/150?img=1" alt="User 1" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/150?img=2" alt="User 2" className="w-10 h-10 rounded-full border-2 border-white" />
                </div>
                <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span className="text-white text-lg">+</span>
                </button>
              </div>
              <button className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors">
                <Activity className="w-4 h-4" />
                <span>Add comment</span>
              </button>
            </div>

            {/* Day/Night Toggle */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsDarkMode(false)}
                  className={`flex-1 p-3 rounded-xl transition-all ${!isDarkMode ? 'bg-yellow-400 shadow-lg' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  <Sun className={`w-6 h-6 mx-auto ${!isDarkMode ? 'text-gray-900' : 'text-white'}`} />
                </button>
                <button 
                  onClick={() => setIsDarkMode(true)}
                  className={`flex-1 p-3 rounded-xl transition-all ${isDarkMode ? 'bg-yellow-400 shadow-lg' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  <Moon className={`w-6 h-6 mx-auto ${isDarkMode ? 'text-gray-900' : 'text-white'}`} />
                </button>
              </div>
            </div>

            {/* Preview Thumbnail */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-2xl">
              <div className="relative rounded-lg overflow-hidden mb-2">
                <img 
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400" 
                  alt="Solar panel view" 
                  className="w-full h-24 object-cover"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Object Size Control */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
              <h3 className="text-white text-sm font-medium mb-3">View control</h3>
              <div className="flex gap-2 mb-3">
                <button className="w-8 h-8 bg-white text-gray-900 rounded flex items-center justify-center hover:bg-gray-100">−</button>
                <button className="w-8 h-8 bg-white/20 text-white rounded flex items-center justify-center hover:bg-white/30">+</button>
              </div>
              <div className="text-white text-center mb-2">80%</div>
              <input type="range" min="0" max="100" value="80" className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer" />
              
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button className="w-full aspect-square bg-white/20 rounded-lg hover:bg-white/30 transition-colors"></button>
                <button className="w-full aspect-square bg-yellow-400 rounded-lg hover:bg-yellow-300 transition-colors"></button>
                <button className="w-full aspect-square bg-white/20 rounded-lg hover:bg-white/30 transition-colors"></button>
                <button className="w-full aspect-square bg-white/20 rounded-lg hover:bg-white/30 transition-colors"></button>
                <button className="w-full aspect-square bg-white/20 rounded-lg hover:bg-white/30 transition-colors"></button>
              </div>
            </div>
          </div>

          {/* Center - Main Display */}
          <div className="col-span-7 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl max-w-4xl w-full">
              <img 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800" 
                alt="Solar panels" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-4">
            {/* Energy Production */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Energy Production</h3>
                    <p className="text-white/60 text-sm">Real-time generation</p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-white/60" />
              </div>
            </div>

            {/* Battery Status */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Battery className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Battery Status</h3>
                    <p className="text-white/60 text-sm">Current charge level</p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-white/60" />
              </div>
              
              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                <button className="flex-1 px-3 py-2 bg-white/90 text-gray-900 rounded-lg text-sm font-medium">
                  Capacity
                </button>
                <button className="flex-1 px-3 py-2 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-colors">
                  Usage
                </button>
              </div>

              {/* Panel Options */}
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square bg-white/20 rounded-xl hover:bg-white/30 transition-colors"></div>
                <div className="aspect-square bg-white/20 rounded-xl hover:bg-white/30 transition-colors"></div>
                <div className="aspect-square bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl"></div>
                <div className="aspect-square bg-gray-400/30 rounded-xl"></div>
                <div className="aspect-square bg-blue-400/30 rounded-xl"></div>
                <div className="aspect-square bg-gray-500/30 rounded-xl"></div>
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="text-white text-sm font-medium">System efficiency</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-12 bg-gradient-to-r from-amber-200 to-amber-400 rounded-lg flex items-center px-3">
                    <span className="text-gray-900 text-sm font-medium">Optimal performance</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-white/60" />
                </div>
              </div>
            </div>

            {/* Download */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <select className="w-full px-3 py-2 bg-white/20 text-white rounded-lg text-sm border border-white/10">
                    <option>PDF</option>
                    <option>CSV</option>
                    <option>JSON</option>
                  </select>
                </div>
                <button className="px-6 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Performance Stats</h3>
                    <p className="text-white/60 text-sm">Monthly analytics</p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-white/60" />
              </div>
            </div>

            {/* System Settings */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">System Settings</h3>
                    <p className="text-white/60 text-sm">Configure parameters</p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-white/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom AI Generation Button */}
        <div className="fixed bottom-6 left-6">
          <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl shadow-2xl hover:shadow-yellow-500/50 transition-all hover:scale-105">
            <Zap className="w-5 h-5 text-gray-900" />
            <span className="text-gray-900 font-semibold">AI Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
}