"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Skeleton placeholder to preserve chart layout while data loads
const ChartSkeleton = ({ title, description, controls }) => {
  return (
    <Card className="w-full h-120 rounded-xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-500">
          <div className="h-5 w-5 rounded bg-gray-200 animate-pulse" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
        {controls ? <div className="opacity-60">{controls}</div> : null}
      </CardHeader>
      <CardContent>
        <div className="relative h-72 w-full rounded-xl bg-gradient-to-b from-gray-200/60 to-gray-100/40 overflow-hidden">
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_16px_16px,rgba(255,255,255,0.5),transparent_35%)]" />
          <div className="absolute inset-x-8 bottom-4 top-10 flex items-end gap-2">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-t-md bg-gray-300/80 animate-pulse"
                style={{ height: `${30 + ((idx * 7) % 50)}%` }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartSkeleton;
