"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#38bdf8", "#f59e0b", "#fb7185", "#10b981"];

export function SeverityDistributionChart({ data }: { data: Array<{ _id: string; value: number }> }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Severity Distribution</CardTitle>
          <CardDescription>Current spread of low to critical cases.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="_id" innerRadius={70} outerRadius={110} paddingAngle={6}>
                {data.map((entry, index) => (
                  <Cell key={entry._id} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
