"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function TeamPerformanceChart({ data }: { data: Array<{ _id: string; missions: number; completed: number }> }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>Mission volume and completion performance by rescue unit.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="missions" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              <Bar dataKey="completed" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
