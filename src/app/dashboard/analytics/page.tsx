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
        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-[#2D3640]">
            <h3 className="text-base font-bold text-[#1b2a49] dark:text-white">Certification Distribution</h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Breakdown of certifications across the organization</p>
          </div>
          <div className="p-6">
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
                <div className="max-h-64 overflow-y-auto rounded-lg overflow-hidden">
                  <table className="w-full text-xs table-fixed">
                    <thead><tr className="sticky top-0 z-10 bg-[#1b2a49] dark:bg-[#2D3640]">
                      <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-white/90 w-8"></th>
                      <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-white/90 w-50">Certification</th>
                      <th className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-white/90 w-16">Count</th>
                      <th className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-white/90 w-16">%</th>
                    </tr></thead>
                    <tbody>
                      {certDistribution.map((c, i) => (
                        <tr key={c.name} className={`border-b border-slate-100 dark:border-[#2D3640]/50 ${i % 2 === 0 ? "bg-white dark:bg-[#242B33]" : "bg-slate-50/50 dark:bg-[#1C2127]/30"}`}>
                          <td className="px-3 py-2.5"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} /></td>
                          <td className="px-3 py-2.5 font-medium text-slate-700 dark:text-slate-300">{c.name}</td>
                          <td className="px-3 py-2.5 text-right font-bold text-slate-800 dark:text-white">{c.count}</td>
                          <td className="px-3 py-2.5 text-right text-slate-500">{c.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          </div>
        </Card>

        {/* ── Training Distribution by Teams ── */}
        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-[#2D3640]">
            <h3 className="text-base font-bold text-[#1b2a49] dark:text-white">Training Distribution by Teams</h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Number of training assignments per team</p>
          </div>
          {teamTraining.length === 0 ? (
            <p className="py-9 text-center text-sm text-slate-500">No team data</p>
          ) : (
            <div className="mx-auto h-75 w-full max-w-xl p-6">
              <ChartBar
                data={teamTraining.map((t) => ({
                  label: t.team,
                  value: t.count,
                  color: "#4CCBBF",
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
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-[#2D3640]">
            <div>
              <h3 className="text-base font-bold text-[#1b2a49] dark:text-white">Ongoing Certifications</h3>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Members currently pursuing certifications</p>
            </div>
            <Badge className="bg-blue-50 text-blue-700 px-2.5 py-1 text-xs dark:bg-[#2D3640] dark:text-slate-300">{ongoingCerts.length}</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-[#1b2a49] dark:bg-[#4CCBBF]/20">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/90">Employee Name</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/90">Certification Name</th>
                <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-white/90">Status</th>
                <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-white/90">Comments / Remarks</th>
              </tr></thead>
              <tbody>
                {ongoingCerts.length === 0 ? (
                  <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-500">No ongoing certifications</td></tr>
                ) : ongoingCerts.map((c, i) => (
                  <tr key={i} className={`border-b border-slate-100 dark:border-[#2D3640]/50 ${i % 2 === 0 ? "bg-white dark:bg-[#242B33]" : "bg-slate-50/50 dark:bg-[#1C2127]/30"} ${c.comments && c.comments.toLowerCase().includes("extension") ? "bg-amber-50/50 dark:bg-amber-900/5" : ""}`}>
                    <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-white">{c.employeeName}</td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">{c.certificationName}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 dark:bg-[#2D3640] dark:text-slate-300">In Progress</span>
                    </td>
                    <td className="px-5 py-3.5 text-center text-slate-500 italic dark:text-slate-400">{c.comments || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ── Delayed Employees ── */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-[#2D3640]">
            <div>
              <h3 className="text-base font-bold text-[#1b2a49] dark:text-white">Employees with Delayed Training</h3>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Training assignments past their deadline</p>
            </div>
            <Badge className="bg-red-50 text-red-700 px-2.5 py-1 text-xs dark:bg-[#2D3640] dark:text-slate-300">{delayedEmployees.length}</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-[#1b2a49] dark:bg-[#4CCBBF]/20">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/90">Employee</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/90">Team</th>
                <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-white/90">Total</th>
                <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-white/90">Done</th>
                <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-white/90">Delayed</th>
                <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-white/90">Comments</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/90">Courses</th>
              </tr></thead>
              <tbody>
                {delayedEmployees.length === 0 ? (
                  <tr><td colSpan={7} className="px-5 py-8 text-center text-slate-500">No delayed training</td></tr>
                ) : delayedEmployees.map((d, i) => (
                  <tr key={i} className={`border-b border-slate-100 dark:border-[#2D3640]/50 ${i % 2 === 0 ? "bg-white dark:bg-[#242B33]" : "bg-slate-50/50 dark:bg-[#1C2127]/30"}`}>
                    <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-white whitespace-nowrap">{d.name}</td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">{d.role}</td>
                    <td className="px-5 py-3.5 text-center font-medium text-slate-700 dark:text-slate-300">{d.total}</td>
                    <td className="px-5 py-3.5 text-center"><span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-transparent dark:text-slate-300">{d.completed}</span></td>
                    <td className="px-5 py-3.5 text-center"><span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-transparent dark:text-slate-300">{d.delayed}</span></td>
                    <td className="px-5 py-3.5 text-center text-slate-500 italic dark:text-slate-400 max-w-[180px] truncate" title={d.comment}>{d.comment || "—"}</td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 max-w-[200px] truncate" title={d.courses}>{d.courses || "—"}</td>
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
  const colorMap: Record<string, { iconBg: string; text: string; icon: string; gradient: string }> = {
    emerald: { iconBg: "bg-emerald-100 dark:bg-[#2D3640]", text: "text-emerald-700 dark:text-white", icon: "text-emerald-600 dark:text-slate-400", gradient: "from-emerald-50 to-white" },
    blue: { iconBg: "bg-blue-100 dark:bg-[#2D3640]", text: "text-blue-700 dark:text-white", icon: "text-blue-600 dark:text-slate-400", gradient: "from-blue-50 to-white" },
    violet: { iconBg: "bg-violet-100 dark:bg-[#2D3640]", text: "text-violet-700 dark:text-white", icon: "text-violet-600 dark:text-slate-400", gradient: "from-violet-50 to-white" },
    red: { iconBg: "bg-red-100 dark:bg-[#2D3640]", text: "text-red-700 dark:text-white", icon: "text-red-600 dark:text-slate-400", gradient: "from-red-50 to-white" },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <Card className={`relative overflow-hidden border border-slate-200/50 bg-gradient-to-br ${c.gradient} dark:border-[#2D3640] dark:from-[#242B33] dark:to-[#242B33] p-5`}>
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className={`mt-1 text-2xl font-bold ${c.text}`}>{value}</p>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">{subtitle}</p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.iconBg}`}>
          <Icon name={icon as any} size="md" className={c.icon} />
        </div>
      </div>
    </Card>
  );
}
