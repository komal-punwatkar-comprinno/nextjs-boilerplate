import { apiClient } from "@/lib/api-client";
import { API_BASE_URL } from "@/constants/env";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import type { TrainingPlan, TrainingPlanFormData } from "./types";

class TrainingPlanService {
  private readonly basePath = "/training-plans";

  async list(): Promise<TrainingPlan[]> {
    const data = await apiClient.get<{ items?: TrainingPlan[]; plans?: TrainingPlan[] }>(this.basePath);
    return data.items || data.plans || [];
  }

  async create(payload: TrainingPlanFormData): Promise<{ plan_id: string }> {
    return apiClient.post<{ plan_id: string }>(this.basePath, payload);
  }

  async update(planId: string, payload: TrainingPlanFormData): Promise<void> {
    await apiClient.put<unknown>(`${this.basePath}/${planId}`, payload);
  }

  async delete(planId: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${planId}`);
  }

  /** Download Excel template (returns base64 from API, triggers download) */
  async downloadTemplate(): Promise<void> {
    const token = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.ID_TOKEN) : null;
    const res = await fetch(`${API_BASE_URL}${this.basePath}/template`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to download template");
    const base64Data = await res.text();
    const byteChars = atob(base64Data);
    const byteArray = new Uint8Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) byteArray[i] = byteChars.charCodeAt(i);
    const blob = new Blob([byteArray], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "training_plan_template.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /** Upload Excel file (base64) */
  async uploadExcel(file: File): Promise<{ plan_name: string; items_count: number }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(",")[1];
        try {
          const res = await apiClient.post<{ plan_name: string; items_count: number }>(`${this.basePath}/upload`, { file: base64, filename: file.name });
          resolve(res);
        } catch (err) { reject(err); }
      };
      reader.onerror = () => reject(new Error("File read failed"));
      reader.readAsDataURL(file);
    });
  }

  /** Export a single plan to Excel */
  async exportPlanExcel(planId: string): Promise<void> {
    const token = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.ID_TOKEN) : null;
    const res = await fetch(`${API_BASE_URL}${this.basePath}/${planId}/excel/export`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Export failed");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `training_plan_${planId}.xlsx`; a.click();
    URL.revokeObjectURL(url);
  }

  async getTeams(): Promise<string[]> {
    const data = await apiClient.get<{ teams?: string[] }>("/users/teams");
    return data.teams || [];
  }
}

export const trainingPlanService = new TrainingPlanService();
