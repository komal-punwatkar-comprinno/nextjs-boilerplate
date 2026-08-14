"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { analyticsService } from "@/features/analytics";
import type { AnalyticsData } from "@/features/analytics";
import { Icon } from "@/components/ui/icon";
import { Card, Button, PageHeader, Spinner, Badge } from "@/components";
import { ChartPie } from "@/components/data/chart-pie";
import { ChartBar } from "@/components/data/chart-bar";
import { PageSkeleton } from "@/components/common/page-skeleton";

// Dynamic import for PDF (SSR disabled)
const PDFExportButton = dynamic(() => import("./pdf-export-button"), { ssr: false });

const CHART_COLORS = ["#1B2A49", "#FF9472", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899"];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    analyticsService.loadDashboard()
      .then(setData)
      .catch((err) => setError(err.message || "Failed to load analytics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageSkeleton cards={4} />;
  if (error) return <div className="flex h-64 flex-col items-center justify-center gap-2"><Icon name="xCircle" size="lg" className="text-red-500" /><p className="text-sm text-slate-600 dark:text-slate-400">{error}</p></div>;
  if (!data) return null;

  const { metrics, certDistribution, teamTraining, ongoingCerts, delayedEmployees } = data;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Header with export button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageHeader title="Analytics Dashboard" description={`Last updated: ${new Date().toLocaleString()}`} />
        <PDFExportButton data={data} />
      </div>

      {/* Content */}
      <div className="space-y-6">

        {/* ── Key Metrics ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard icon="checkCircle" title="Courses Completed" value={metrics.coursesCompleted} subtitle={`${metrics.completionRate}% completion rate`} color="emerald" />
          <MetricCard icon="users" title="Active Learners" value={metrics.activeLearners} subtitle="Currently in training" color="blue" />
          <MetricCard icon="clock" title="Avg Learning Hours" value={`${metrics.avgHours}h`} subtitle="Per member average" color="violet" />
          <MetricCard icon="warning" title="Delayed Training" value={metrics.delayedMembers} subtitle="Past deadline" color="red" />
        </div>

        {/* ── Certification Distribution ── */}
        <Card className="p-6">
          <h3 className="mb-5 text-sm font-semibold text-slate-800 dark:text-white">Certification Distribution</h3>
          {certDistribution.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">No certification data</p>
          ) : (
            <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
              {/* Pie chart on left */}
              <div className="flex justify-center lg:start">
                {(() => {
                  const top7 = certDistribution.slice(0, 7);
                  const othersCount = certDistribution.slice(7).reduce((sum, c) => sum + c.count, 0);
                  const pieData = top7.map((c, i) => ({
                    label: c.name,
                    value: c.count,
                    color: CHART_COLORS[i % CHART_COLORS.length],
                  }));
                  if (othersCount > 0) {
                    pieData.push({ label: "Others", value: othersCount, color: CHART_COLORS[7] });
                  }
                  return (
                    <ChartPie
                      data={pieData}
                      donut
                      size={350}
                      showLabels={false}
                    />
                  );
                })()}
              </div>
              {/* Table on right */}
              <div className="w-full lg:w-200 shrink-0">
                <div className="max-h-64 overflow-y-auto rounded-lg border border-slate-100 dark:border-[#2D3640]">
                  <table className="w-full text-xs table-fixed">
                    <thead><tr className="sticky top-0 border-b border-slate-200 bg-slate-50 dark:border-[#2D3640] dark:bg-[#1C2127]">
                      <th className="px-3 py-2 text-left text-slate-500 w-8"></th>
                      <th className="px-3 py-2 text-left text-slate-500 w-50">Certification</th>
                      <th className="px-3 py-2 text-right text-slate-500 w-16">Count</th>
                      <th className="px-3 py-2 text-right text-slate-500 w-16">%</th>
                    </tr></thead>
                    <tbody>
                      {certDistribution.map((c, i) => (
                        <tr key={c.name} className="border-b border-slate-50 dark:border-[#2D3640]/50 hover:bg-slate-50 dark:hover:bg-[#2D3640]/20">
                          <td className="px-3 py-2"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} /></td>
                          <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{c.name}</td>
                          <td className="px-3 py-2 text-right font-semibold text-slate-800 dark:text-white">{c.count}</td>
                          <td className="px-3 py-2 text-right text-slate-500">{c.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* ── Training Distribution by Teams ── */}
        <Card className="p-6 overflow-hidden">
          <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-white">Training Distribution by Teams</h3>
          {teamTraining.length === 0 ? (
            <p className="py-9 text-center text-sm text-slate-500">No team data</p>
          ) : (
            <div className="mx-auto h-75 w-full max-w-xl">
              <ChartBar
                data={teamTraining.map((t) => ({
                  label: t.team,
                  value: t.count,
                  color: "#1B2A49",
                }))}
                height={250}
                showGrid
                showLabels
              />
            </div>
          )}
        </Card>

        {/* ── Ongoing Certifications ── */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-[#2D3640]">
            <h3 className="text-base font-bold text-[#1b2a49] dark:text-white">Ongoing Certifications</h3>
            <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">{ongoingCerts.length}</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-slate-100 bg-slate-50 dark:border-[#2D3640] dark:bg-[#1C2127]">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-500">Employee</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-500">Certification</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-500">Status</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-500">Comments</th>
              </tr></thead>
              <tbody>
                {ongoingCerts.length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-slate-500">No ongoing certifications</td></tr>
                ) : ongoingCerts.map((c, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-[#2D3640]/50 hover:bg-slate-50 dark:hover:bg-[#2D3640]/20">
                    <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-300">{c.employeeName}</td>
                    <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">{c.certificationName}</td>
                    <td className="px-4 py-2.5 font-medium text-blue-600 dark:text-blue-400">In Progress</td>
                    <td className="px-4 py-2.5 text-slate-500 dark:text-slate-400 max-w-[200px] truncate">{c.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ── Delayed Employees ── */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-[#2D3640]">
            <h3 className="text-base font-bold text-[#1b2a49] dark:text-white">Employees with Delayed Training</h3>
            <Badge className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">{delayedEmployees.length}</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-slate-100 bg-slate-50 dark:border-[#2D3640] dark:bg-[#1C2127]">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-500">Employee</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-500">Team</th>
                <th className="px-4 py-2.5 text-center text-xs font-medium text-slate-500">Total</th>
                <th className="px-4 py-2.5 text-center text-xs font-medium text-slate-500">Done</th>
                <th className="px-4 py-2.5 text-center text-xs font-medium text-slate-500">Delayed</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-500">Comments</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-500">Courses</th>
              </tr></thead>
              <tbody>
                {delayedEmployees.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-6 text-center text-slate-500">No delayed training</td></tr>
                ) : delayedEmployees.map((d, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-[#2D3640]/50 hover:bg-slate-50 dark:hover:bg-[#2D3640]/20">
                    <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">{d.name}</td>
                    <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">{d.role}</td>
                    <td className="px-4 py-2.5 text-center text-slate-600 dark:text-slate-400">{d.total}</td>
                    <td className="px-4 py-2.5 text-center text-emerald-600 font-medium">{d.completed}</td>
                    <td className="px-4 py-2.5 text-center"><Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">{d.delayed}</Badge></td>
                    <td className="px-4 py-2.5 text-slate-500 dark:text-slate-400 max-w-[180px] truncate" title={d.comment}>{d.comment}</td>
                    <td className="px-4 py-2.5 text-slate-500 dark:text-slate-400 max-w-[180px] truncate" title={d.courses}>{d.courses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </div>
  );
}

// ─── Metric Card ─────────────────────────────────────────────────────────────

function MetricCard({ icon, title, value, subtitle, color }: { icon: string; title: string; value: string | number; subtitle: string; color: string }) {
  const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
    emerald: { bg: "bg-emerald-50 dark:bg-emerald-900/10", text: "text-emerald-700 dark:text-emerald-400", icon: "text-emerald-500" },
    blue: { bg: "bg-blue-50 dark:bg-blue-900/10", text: "text-blue-700 dark:text-blue-400", icon: "text-blue-500" },
    violet: { bg: "bg-violet-50 dark:bg-violet-900/10", text: "text-violet-700 dark:text-violet-400", icon: "text-violet-500" },
    red: { bg: "bg-red-50 dark:bg-red-900/10", text: "text-red-700 dark:text-red-400", icon: "text-red-500" },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
          <Icon name={icon as any} size="sm" className={c.icon} />
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className={`text-xl font-bold ${c.text}`}>{value}</p>
          <p className="text-[10px] text-slate-400">{subtitle}</p>
        </div>
      </div>
    </Card>
  );
}
