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
  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white overflow-hidden transition-shadow hover:shadow-sm dark:border-[#2D3640] dark:bg-[#242B33]">
      {/* Top accent */}
      <div className={`h-1 w-full ${cert.status === "Completed" ? "bg-emerald-400" : cert.status === "In Progress" ? "bg-blue-400" : "bg-slate-200 dark:bg-slate-700"}`} />

      <div className="p-4 flex flex-col flex-1">
        {/* Cert name + status */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] font-semibold text-slate-800 leading-tight dark:text-white">{cert.certification_name}</p>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium ${
            cert.status === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
            cert.status === "In Progress" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
            "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
          }`}>{cert.status}</span>
        </div>

        {/* Extension badge */}
        {cert.extension_status === "pending" && <Badge className="mt-1.5 w-fit bg-amber-100 text-amber-700 text-[9px] px-1.5 py-0 dark:bg-amber-900/30 dark:text-amber-400">Ext. Pending</Badge>}
        {cert.extension_status === "approved" && <Badge className="mt-1.5 w-fit bg-emerald-100 text-emerald-700 text-[9px] px-1.5 py-0 dark:bg-emerald-900/30 dark:text-emerald-400">Ext. Approved</Badge>}

        {/* Meta */}
        <div className="mt-2.5 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
          {cert.target_date && <p>📅 Target: {formatDate(cert.target_date)}</p>}
          {(cert.completion_date || cert.completed_date) && <p>✅ Completed: {formatDate(cert.completion_date || cert.completed_date)}</p>}
          {cert.comments && <p className="italic text-slate-400 dark:text-slate-500">"{cert.comments}"</p>}
        </div>

        {/* View cert */}
        {cert.certification_image && (
          <a href={cert.certification_image} target="_blank" rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:underline dark:text-blue-400">
            <Icon name="eye" size="sm" /> View Certificate
          </a>
        )}

        {/* Actions */}
        <div className="mt-auto flex items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-[#2D3640] mt-3">
          {canEdit && (
            <button onClick={() => onEdit(cert)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-[#1b2a49] dark:hover:bg-[#2D3640] dark:hover:text-white" title="Edit"><Icon name="edit" size="sm" /></button>
          )}
          {canDelete && (
            <button onClick={() => onDelete(cert.record_id, cert.certification_name)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400" title="Delete"><Icon name="trash" size="sm" /></button>
          )}
          {canRequestExtension && (
            <button onClick={() => onRequestExtension(cert)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-[#1b2a49] dark:hover:bg-[#2D3640] dark:hover:text-white" title="Request Extension"><Icon name="clock" size="sm" /></button>
          )}
        </div>
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
    return (
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className="group flex flex-col items-center rounded-lg border border-slate-200 bg-white px-4 py-4 cursor-pointer transition-all hover:shadow-sm hover:border-slate-300 dark:border-[#2D3640] dark:bg-[#242B33] dark:hover:border-[#3D4A5C]"
      >
        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1b2a49] text-sm font-bold text-white">
          {group.member.charAt(0).toUpperCase()}
        </div>

        {/* Name + team */}
        <p className="mt-2 text-[13px] font-semibold text-slate-800 text-center truncate w-full dark:text-white">{group.member}</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{group.team || "—"}</p>

        {/* Stats row with subtle backgrounds */}
        <div className="mt-3 flex items-center gap-2 w-full">
          <div className="flex-1 rounded-md bg-slate-50 py-1.5 text-center dark:bg-[#2D3640]">
            <p className="text-sm font-bold text-slate-800 dark:text-white">{total}</p>
            <p className="text-[9px] text-slate-500">Total</p>
          </div>
          <div className="flex-1 rounded-md bg-emerald-50 py-1.5 text-center dark:bg-emerald-900/10">
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{completed}</p>
            <p className="text-[9px] text-emerald-600 dark:text-emerald-500">Done</p>
          </div>
          <div className="flex-1 rounded-md bg-blue-50 py-1.5 text-center dark:bg-blue-900/10">
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{inProgress}</p>
            <p className="text-[9px] text-blue-600 dark:text-blue-500">Active</p>
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
