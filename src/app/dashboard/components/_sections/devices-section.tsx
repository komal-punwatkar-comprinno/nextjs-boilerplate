"use client";

import { ComponentPreview } from "../_components/component-preview";
import { SectionWrapper } from "./section-wrapper";
import { DeviceFrame } from "@/components";

export function DevicesSection() {
  return (
    <SectionWrapper id="devices" title="Devices" description="Responsive device frame mockups for showcasing UI at different breakpoints.">
      <div className="space-y-8">
        {/* All device types showcase */}
        <ComponentPreview
          title="Device Frames"
          code={`<DeviceFrame type="phone">
  <div>Your mobile UI here</div>
</DeviceFrame>

<DeviceFrame type="tablet">
  <div>Your tablet UI here</div>
</DeviceFrame>

<DeviceFrame type="laptop">
  <div>Your desktop UI here</div>
</DeviceFrame>`}
        >
          <div className="space-y-12">
            {/* Laptop / Desktop view */}
            <div className="flex justify-center overflow-x-auto pb-4">
              <DeviceFrame type="laptop">
                <div className="h-full w-full">
                  {/* Simulated dashboard UI */}
                  <div className="flex h-full">
                    {/* Mini sidebar */}
                    <div className="w-14 shrink-0 border-r border-zinc-100 bg-slate-900 p-2 dark:border-[#2D3640]">
                      <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-[#4CCBBF]">
                        <span className="text-[10px] font-bold text-white">N</span>
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={`h-6 w-6 mx-auto rounded ${i === 1 ? "bg-[#4CCBBF]/20" : "bg-white/5"}`} />
                        ))}
                      </div>
                    </div>
                    {/* Main content */}
                    <div className="flex-1 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <div className="h-4 w-28 rounded bg-zinc-200 dark:bg-[#2D3640]" />
                          <div className="mt-1.5 h-2.5 w-44 rounded bg-zinc-100 dark:bg-[#2D3640]" />
                        </div>
                        <div className="h-7 w-20 rounded-md bg-[#4CCBBF]" />
                      </div>
                      {/* Stats row */}
                      <div className="mb-3 grid grid-cols-4 gap-2">
                        {[
                          { value: "$48.2K", label: "Revenue", color: "bg-emerald-50 dark:bg-emerald-500/10", accent: "text-emerald-600 dark:text-emerald-400" },
                          { value: "1,420", label: "Users", color: "bg-blue-50 dark:bg-blue-500/10", accent: "text-blue-600 dark:text-blue-400" },
                          { value: "4.8%", label: "Growth", color: "bg-purple-50 dark:bg-purple-500/10", accent: "text-purple-600 dark:text-purple-400" },
                          { value: "99.9%", label: "Uptime", color: "bg-amber-50 dark:bg-amber-500/10", accent: "text-amber-600 dark:text-amber-400" },
                        ].map((stat) => (
                          <div key={stat.label} className={`rounded-lg ${stat.color} p-2`}>
                            <p className={`text-sm font-bold ${stat.accent}`}>{stat.value}</p>
                            <p className="text-[9px] text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                      {/* Chart area */}
                      <div className="rounded-lg border border-zinc-100 p-3 dark:border-[#2D3640]">
                        <div className="mb-2 h-2.5 w-16 rounded bg-zinc-200 dark:bg-[#2D3640]" />
                        <div className="flex items-end gap-1 h-20">
                          {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t bg-gradient-to-t from-[#4CCBBF] to-[#4CCBBF]/40"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DeviceFrame>
            </div>

            {/* Phone + Tablet side by side */}
            <div className="flex flex-wrap items-end justify-center gap-10">
              {/* Phone */}
              <DeviceFrame type="phone">
                <div className="p-4">
                  {/* App header */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4CCBBF] to-[#31b0a5]" />
                      <div>
                        <div className="h-2.5 w-16 rounded bg-zinc-200 dark:bg-[#2D3640]" />
                        <div className="mt-1 h-2 w-10 rounded bg-zinc-100 dark:bg-[#2D3640]" />
                      </div>
                    </div>
                    <div className="h-5 w-5 rounded bg-zinc-100 dark:bg-[#2D3640]" />
                  </div>
                  {/* Card */}
                  <div className="mb-3 rounded-xl bg-gradient-to-br from-[#4CCBBF] to-[#2D9F96] p-4">
                    <p className="text-[10px] text-white/70">Total Balance</p>
                    <p className="text-lg font-bold text-white">$24,562.00</p>
                    <div className="mt-2 flex gap-2">
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-[8px] text-white">+12.5%</span>
                    </div>
                  </div>
                  {/* Transactions list */}
                  <p className="mb-2 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Recent Activity</p>
                  {[
                    { name: "Spotify", amount: "-$9.99", icon: "🎵" },
                    { name: "Amazon", amount: "-$42.50", icon: "📦" },
                    { name: "Salary", amount: "+$4,500", icon: "💰" },
                    { name: "Netflix", amount: "-$15.99", icon: "🎬" },
                    { name: "Transfer", amount: "+$200", icon: "🔄" },
                  ].map((tx) => (
                    <div key={tx.name} className="flex items-center justify-between border-b border-zinc-50 py-2 last:border-0 dark:border-[#2D3640]">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{tx.icon}</span>
                        <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">{tx.name}</span>
                      </div>
                      <span className={`text-[11px] font-semibold ${tx.amount.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-600 dark:text-zinc-400"}`}>
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                  {/* Bottom nav */}
                  <div className="mt-4 flex justify-around rounded-xl bg-zinc-50 py-2 dark:bg-[#1A1F26]">
                    {["🏠", "📊", "💳", "👤"].map((icon, i) => (
                      <div key={i} className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${i === 0 ? "bg-[#4CCBBF]/10" : ""}`}>
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
              </DeviceFrame>

              {/* Tablet */}
              <DeviceFrame type="tablet">
                <div className="flex h-full">
                  {/* Sidebar */}
                  <div className="w-32 shrink-0 border-r border-zinc-100 bg-zinc-50 p-3 dark:border-[#2D3640] dark:bg-[#1A1F26]">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="h-6 w-6 rounded-md bg-[#4CCBBF]" />
                      <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">SkillApp</span>
                    </div>
                    {["Dashboard", "Analytics", "Users", "Settings"].map((item, i) => (
                      <div
                        key={item}
                        className={`mb-1 rounded-md px-2 py-1.5 text-[9px] ${
                          i === 0
                            ? "bg-[#4CCBBF]/10 font-medium text-[#4CCBBF]"
                            : "text-zinc-500 dark:text-zinc-400"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-[#2D3640]" />
                      <div className="flex gap-1.5">
                        <div className="h-6 w-14 rounded bg-zinc-100 dark:bg-[#2D3640]" />
                        <div className="h-6 w-14 rounded bg-[#4CCBBF]" />
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="mb-3 grid grid-cols-3 gap-2">
                      {[
                        { value: "256", label: "Active", color: "text-emerald-600 dark:text-emerald-400" },
                        { value: "38", label: "Pending", color: "text-amber-600 dark:text-amber-400" },
                        { value: "12", label: "Overdue", color: "text-red-500" },
                      ].map((s) => (
                        <div key={s.label} className="rounded-lg border border-zinc-100 p-2 text-center dark:border-[#2D3640]">
                          <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                          <p className="text-[8px] text-zinc-400">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    {/* Table */}
                    <div className="rounded-lg border border-zinc-100 dark:border-[#2D3640]">
                      <div className="grid grid-cols-4 border-b border-zinc-100 bg-zinc-50 px-2 py-1.5 text-[8px] font-semibold text-zinc-500 dark:border-[#2D3640] dark:bg-[#1A1F26] dark:text-zinc-400">
                        <span>Name</span><span>Role</span><span>Status</span><span>Progress</span>
                      </div>
                      {[
                        { name: "Alice W.", role: "Dev", status: "Active", progress: 85 },
                        { name: "Bob K.", role: "Design", status: "Active", progress: 72 },
                        { name: "Carol M.", role: "PM", status: "Away", progress: 60 },
                        { name: "Dan S.", role: "Dev", status: "Active", progress: 91 },
                      ].map((row) => (
                        <div key={row.name} className="grid grid-cols-4 items-center border-b border-zinc-50 px-2 py-1.5 last:border-0 dark:border-[#2D3640]">
                          <span className="text-[9px] font-medium text-zinc-700 dark:text-zinc-300">{row.name}</span>
                          <span className="text-[9px] text-zinc-500 dark:text-zinc-400">{row.role}</span>
                          <span className={`inline-block w-fit rounded-full px-1.5 py-0.5 text-[7px] font-medium ${
                            row.status === "Active" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                          }`}>{row.status}</span>
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 flex-1 rounded-full bg-zinc-100 dark:bg-[#2D3640]">
                              <div className="h-full rounded-full bg-[#4CCBBF]" style={{ width: `${row.progress}%` }} />
                            </div>
                            <span className="text-[8px] text-zinc-500 dark:text-zinc-400">{row.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DeviceFrame>
            </div>
          </div>
        </ComponentPreview>
      </div>
    </SectionWrapper>
  );
}
