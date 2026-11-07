"use client";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function IncidentTrendsChart({ data }: { data: Array<{ _id: string; incidents: number; critical: number }> }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Incident Trends</CardTitle>
          <CardDescription>Seven-day trend line for incoming emergencies and critical spikes.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="incidents" stroke="#3b82f6" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="critical" stroke="#f43f5e" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
