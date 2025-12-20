import React from "react";
import { Zap, Check } from "lucide-react";
import solarImg from "./panel1.jpg";

export default function SunrockLanding() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
        {/* Image block */}
        <div className="rounded-3xl shadow-2xl overflow-hidden bg-white h-full min-h-[620px]">
          <img src={solarImg} alt="Solar panels" className="w-full h-full object-cover" />
        </div>

        {/* Text block */}
        <div className="bg-gradient-to-br from-[#3fa8ff] to-[#0d6bff] rounded-3xl shadow-2xl p-10 text-white flex flex-col justify-between h-full min-h-[620px]">
          <div className="flex items-center gap-2 bg-white/15 text-white px-3 py-1.5 rounded-full w-fit text-sm font-semibold">
            <Zap className="w-4 h-4" />
            Solution
          </div>
          <div className="space-y-6 mt-6">
            <h1 className="text-4xl md:text-4xl font-semibold leading-tight">
              Monitor your solar panels, receive instant alerts for anomalies, and optimize usage for maximum savings and
              peace of mind.
            </h1>
            <ul className="space-y-3 text-lg">
              {[
                "Real-time energy tracking",
                "Anomaly alerts",
                "Historical performance reports",
                "Remote diagnostics & support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
