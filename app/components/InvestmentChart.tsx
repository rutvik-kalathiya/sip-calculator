"use client";

import { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeContext } from "./ThemeProvider"; // Import the Theme Context

interface ChartProps {
  futureValues: { name: string; value: number }[];
}

export default function InvestmentChart({ futureValues }: ChartProps) {
  if (futureValues.length === 0) return null;

  const { theme } = useContext(ThemeContext); // Get the current theme

  // Define colors based on theme
  const lightColors = ["#1E3A8A", "#9333EA"]; // Blue & Purple for Light Mode
  const darkColors = ["#60A5FA", "#D8B4FE"]; // Soft Blue & Soft Purple for Dark Mode
  const COLORS = theme === "dark" ? darkColors : lightColors;

  return (
    <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-colors">
      <CardContent className="flex flex-col items-center">
        <p className="text-lg font-semibold text-center mb-4">Investment Breakdown</p>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={futureValues}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
            >
              {futureValues.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) =>
                `₹${new Intl.NumberFormat("en-IN").format(value)}`
              }
              contentStyle={{
                backgroundColor: theme === "dark" ? "#374151" : "#ffffff", // Dark Gray for Dark Mode, White for Light Mode
                color: theme === "dark" ? "#F9FAFB" : "#111827", // White text for Dark Mode, Black text for Light Mode
                borderRadius: "8px",
                border: theme === "dark" ? "1px solid #6B7280" : "1px solid #D1D5DB", // Subtle border for visibility
                padding: "8px",
              }}
              itemStyle={{
                color: theme === "dark" ? "#F9FAFB" : "#111827", // Ensure tooltip item text is visible
                fontWeight: "bold",
              }}
              labelStyle={{
                color: theme === "dark" ? "#F9FAFB" : "#111827", // Ensure the label (category) is readable
                fontWeight: "bold",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Values below the chart */}
        <div className="mt-6 text-center text-lg font-medium space-y-2">
          {futureValues.map((entry, index) => (
            <p key={index} className={index === 0 ? "text-blue-600 dark:text-blue-300" : "text-purple-600 dark:text-purple-300"}>
              {entry.name}: ₹{new Intl.NumberFormat("en-IN").format(entry.value)}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
