"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Badge, Button } from "@/components";
import type { CertificationRecord, MemberCertGroup } from "../types";

function formatDate(dateStr?: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function statusDot(status: string) {
  if (status === "Completed") return "bg-emerald-500";
  if (status === "In Progress") return "bg-blue-500";
  return "bg-slate-400";
}

// ─── CertItem (used inside detail modal + member view) ───────────────────────

interface CertItemProps {
  cert: CertificationRecord;
  canEdit: boolean;
  canDelete: boolean;
  canRequestExtension: boolean;
  onEdit: (cert: CertificationRecord) => void;
  onDelete: (recordId: string, name: string) => void;
  onRequestExtension: (cert: CertificationRecord) => void;
}

export function CertItem({ cert, canEdit, canDelete, canRequestExtension, onEdit, onDelete, onRequestExtension }: CertItemProps) {
  const statusColor = cert.status === "Completed" 
    ? "bg-emerald-500" 
    : cert.status === "In Progress" 
      ? "bg-blue-500" 
      : "bg-slate-400";

  return (
    <div className="flex flex-col h-full rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 dark:border-[#3D4A5C] dark:bg-[#2D3640] dark:hover:border-[#4CCBBF]/30">
      {/* Status dot + Title */}
      <div className="flex items-start gap-3">
        <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${statusColor}`} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800 dark:text-white leading-snug">{cert.certification_name}</p>
          <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            cert.status === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300" :
            cert.status === "In Progress" ? "bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300" :
            "bg-slate-100 text-slate-600 dark:bg-slate-600/20 dark:text-slate-300"
          }`}>{cert.status}</span>
        </div>
      </div>

      {/* Extension badge */}
      {cert.extension_status === "pending" && <div className="mt-3"><Badge className="w-fit bg-amber-50 text-amber-700 text-[10px] px-2 py-0.5 dark:bg-amber-400/10 dark:text-amber-300">⏳ Extension Pending</Badge></div>}
      {cert.extension_status === "approved" && <div className="mt-3"><Badge className="w-fit bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 dark:bg-emerald-400/10 dark:text-emerald-300">✓ Extension Approved</Badge></div>}

      {/* Meta */}
      <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
        {cert.target_date && (
          <div className="flex items-center gap-2">
            <Icon name="calendar" size="sm" className="text-slate-400 dark:text-slate-500" />
            <span>Target: <strong>{formatDate(cert.target_date)}</strong></span>
          </div>
        )}
        {(cert.completion_date || cert.completed_date) && (
          <div className="flex items-center gap-2">
            <Icon name="check" size="sm" className="text-emerald-500" />
            <span>Completed: <strong>{formatDate(cert.completion_date || cert.completed_date)}</strong></span>
          </div>
        )}
        {cert.comments && <p className="text-[11px] italic text-slate-400 dark:text-slate-500">"{cert.comments}"</p>}
      </div>

      {/* View cert link */}
      {cert.certification_image && (
        <a href={cert.certification_image} target="_blank" rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 w-fit">
          <Icon name="eye" size="sm" /> View Certificate
        </a>
      )}

      {/* Actions — always at bottom */}
      <div className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-[#3D4A5C]/50 mt-4">
        {canEdit && (
          <button onClick={() => onEdit(cert)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-[#3D4A5C] dark:hover:text-white transition-colors" title="Edit"><Icon name="edit" size="sm" /></button>
        )}
        {canDelete && (
          <button onClick={() => onDelete(cert.record_id, cert.certification_name)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-400/10 dark:hover:text-red-300 transition-colors" title="Delete"><Icon name="trash" size="sm" /></button>
        )}
        {canRequestExtension && (
          <button onClick={() => onRequestExtension(cert)} className="rounded-lg p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-400/10 dark:hover:text-amber-300 transition-colors" title="Request Extension"><Icon name="clock" size="sm" /></button>
        )}
      </div>
    </div>
  );
}

// ─── MemberCertCard (for admin/manager - summary card, click to expand in modal) ─

interface MemberCertCardProps {
  group: MemberCertGroup;
  userRole: string;
  userName: string;
  onEdit: (cert: CertificationRecord) => void;
  onDelete: (recordId: string, name: string) => void;
  onRequestExtension: (cert: CertificationRecord) => void;
}

export function MemberCertCard({ group, userRole, userName, onEdit, onDelete, onRequestExtension }: MemberCertCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const canEdit = userRole === "admin" || userRole === "manager" || (userRole === "member" && group.member === userName);
  const canDelete = userRole === "admin" || (userRole === "member" && group.member === userName);

  const completed = group.certifications.filter((c) => c.status === "Completed").length;
  const inProgress = group.certifications.filter((c) => c.status === "In Progress").length;
  const notStarted = group.certifications.length - completed - inProgress;

  // For member view — show cards directly (no summary)
  if (userRole === "member") {
    const count = group.certifications.length;
    const gridClass = count === 1 ? "grid gap-4 grid-cols-1 max-w-lg" : count === 2 ? "grid gap-4 grid-cols-2" : "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    return (
      <div className={gridClass}>
        {group.certifications.map((cert) => (
          <CertItem
            key={cert.record_id}
            cert={cert}
            canEdit={canEdit}
            canDelete={canDelete}
            canRequestExtension={cert.member_name === userName && cert.status !== "Completed" && cert.extension_status !== "pending"}
            onEdit={onEdit}
            onDelete={onDelete}
            onRequestExtension={onRequestExtension}
          />
        ))}
      </div>
    );
  }

  // For admin/manager — vertical contact card style
  const total = group.certifications.length;
  const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className="group flex flex-col rounded-xl border border-slate-200/80 bg-white cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5 dark:border-[#3D4A5C] dark:bg-[#242B33] dark:hover:border-[#4CCBBF]/30 overflow-hidden"
      >
        <div className="flex flex-col items-center px-4 py-5">
          {/* Avatar */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1b2a49] to-[#2a3d5f] text-sm font-bold text-white shadow-md">
            {group.member.charAt(0).toUpperCase()}
          </div>

          {/* Name + team */}
          <p className="mt-2.5 text-sm font-semibold text-slate-800 text-center truncate w-full dark:text-white">{group.member}</p>
          {group.team && (
            <span className="mt-1 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-[#2D3640] dark:text-slate-400">{group.team}</span>
          )}

          {/* Completion percentage */}
          <p className="mt-3 text-lg font-bold text-slate-800 dark:text-white">{completionPct}%</p>
          <p className="text-[10px] text-slate-400">completion</p>

          {/* Stats pills */}
          <div className="mt-3 flex items-center gap-1.5 w-full justify-center">
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-transparent dark:text-slate-300">{completed} Completed</span>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700 dark:bg-transparent dark:text-slate-300">{inProgress} In Progress</span>
            {notStarted > 0 && <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 dark:bg-transparent dark:text-slate-400">{notStarted} Not Started</span>}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={() => setShowDetail(false)}>
          <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-[#242B33]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">{group.member}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{group.team || "No Team"} · {group.certifications.length} certification{group.certifications.length !== 1 ? "s" : ""}</p>
              </div>
              <button onClick={() => setShowDetail(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D3640]">
                <Icon name="x" size="sm" />
              </button>
            </div>

            {/* All certs */}
            <div className="grid gap-3 sm:grid-cols-2">
              {group.certifications.map((cert) => (
                <CertItem
                  key={cert.record_id}
                  cert={cert}
                  canEdit={canEdit}
                  canDelete={canDelete}
                  canRequestExtension={
                    userRole === "member" && cert.member_name === userName &&
                    cert.status !== "Completed" && cert.extension_status !== "pending"
                  }
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onRequestExtension={onRequestExtension}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
