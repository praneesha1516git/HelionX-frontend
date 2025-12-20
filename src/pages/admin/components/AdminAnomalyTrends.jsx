"use client";

import AnomalyTrends from "@/pages/anomalies/components/anomalyTrends";

// Admin wrapper to render trends for all anomalies
export default function AdminAnomalyTrends({ solarUnitId }) {
  return <AnomalyTrends admin />;
}
