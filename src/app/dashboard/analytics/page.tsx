"use client";

import { useState } from "react";
import {
  PageHeader,
  Select,
  StatCard,
  Tabs,
  ChartArea,
  ChartBar,
  ChartLine,
  ChartPie,
  Card,
  Icon,
  Badge,
} from "@/components";

// ---------- Mock Data ----------

const revenueData = [
  { label: "Mon", value: 4200 },
  { label: "Tue", value: 5800 },
  { label: "Wed", value: 4900 },
  { label: "Thu", value: 7200 },
  { label: "Fri", value: 6100 },
  { label: "Sat", value: 8400 },
  { label: "Sun", value: 7600 },
];

const ordersData = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 145 },
  { label: "Wed", value: 98 },
  { label: "Thu", value: 167 },
  { label: "Fri", value: 134 },
  { label: "Sat", value: 189 },
  { label: "Sun", value: 156 },
];

const userGrowthData = [
  { label: "Jan", value: 820 },
  { label: "Feb", value: 930 },
  { label: "Mar", value: 1050 },
  { label: "Apr", value: 1120 },
  { label: "May", value: 1280 },
  { label: "Jun", value: 1420 },
];

const trafficSourcesData = [
  { label: "Organic", value: 42, color: "#4CCBBF" },
  { label: "Direct", value: 28, color: "#6366F1" },
  { label: "Referral", value: 18, color: "#F59E0B" },
  { label: "Social", value: 12, color: "#EC4899" },
];

const topPages = [
  { page: "/dashboard", views: "12,847", bounceRate: "24%" },
  { page: "/products", views: "8,392", bounceRate: "31%" },
  { page: "/pricing", views: "6,721", bounceRate: "18%" },
  { page: "/blog/getting-started", views: "4,503", bounceRate: "42%" },
  { page: "/docs/api-reference", views: "3,198", bounceRate: "15%" },
];

const dateRangeOptions = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];

// ---------- Component ----------

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7");

  const overviewContent = (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <Card.Header>
          <h3 className="text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]">
            Revenue Trend
          </h3>
        </Card.Header>
        <Card.Body>
          <ChartArea data={revenueData} height={180} />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <h3 className="text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]">
            Weekly Orders
          </h3>
        </Card.Header>
        <Card.Body>
          <ChartBar data={ordersData} height={180} />
        </Card.Body>
      </Card>
    </div>
  );

  const detailsContent = (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <Card.Header>
          <h3 className="text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]">
            User Growth
          </h3>
        </Card.Header>
        <Card.Body>
          <ChartLine data={userGrowthData} height={180} />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <h3 className="text-sm font-medium text-zinc-700 dark:text-[#E8EDF2]">
            Traffic Sources
          </h3>
        </Card.Header>
        <Card.Body className="flex items-center justify-center">
          <ChartPie data={trafficSourcesData} size={180} />
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description={`Showing data for the last ${dateRange} days`}
        actions={
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          />
        }
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Revenue"
          value="$48.2K"
          change={12.5}
          trend="up"
          icon={<Icon name="tag" size="md" />}
        />
        <StatCard
          title="Users"
          value="1,420"
          change={8.2}
          trend="up"
          icon={<Icon name="users" size="md" />}
        />
        <StatCard
          title="Orders"
          value="856"
          change={-3.1}
          trend="down"
          icon={<Icon name="folder" size="md" />}
        />
        <StatCard
          title="Conversion"
          value="4.8%"
          change={1.2}
          trend="up"
          icon={<Icon name="chartBar" size="md" />}
        />
      </div>

      {/* Tabs */}
      <Tabs
        items={[
          { id: "overview", label: "Overview", content: overviewContent },
          { id: "details", label: "Details", content: detailsContent },
        ]}
      />

      {/* Top Pages */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-[#E8EDF2]">
            Top Pages
          </h3>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-[#2D3640]">
                  <th className="px-5 py-3 text-left font-medium text-zinc-500 dark:text-[#9FAEC1]">
                    Page
                  </th>
                  <th className="px-5 py-3 text-left font-medium text-zinc-500 dark:text-[#9FAEC1]">
                    Views
                  </th>
                  <th className="px-5 py-3 text-left font-medium text-zinc-500 dark:text-[#9FAEC1]">
                    Bounce Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((row) => (
                  <tr
                    key={row.page}
                    className="border-b border-zinc-50 last:border-0 dark:border-[#2D3640]"
                  >
                    <td className="px-5 py-3 font-medium text-zinc-900 dark:text-[#E8EDF2]">
                      {row.page}
                    </td>
                    <td className="px-5 py-3 text-zinc-600 dark:text-[#9FAEC1]">
                      {row.views}
                    </td>
                    <td className="px-5 py-3">
                      <Badge
                        variant={
                          parseInt(row.bounceRate) > 30
                            ? "warning"
                            : parseInt(row.bounceRate) > 20
                              ? "default"
                              : "success"
                        }
                      >
                        {row.bounceRate}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
