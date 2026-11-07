"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ResourceAllocationChart({ data }: { data: Array<{ name: string; allocated: number; available: number }> }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Resource Allocation</CardTitle>
          <CardDescription>Available versus allocated operational inventory.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="available" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="allocated" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
