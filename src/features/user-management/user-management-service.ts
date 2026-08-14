import { apiClient } from "@/lib/api-client";
import { API_BASE_URL } from "@/constants/env";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import type { User, UserFormData } from "./types";

class UserManagementService {
  async list(): Promise<User[]> {
    const data = await apiClient.get<{ users?: User[]; items?: User[] }>("/users");
    return data.users || data.items || [];
  }

  async create(payload: UserFormData): Promise<void> {
    await apiClient.post<unknown>("/users", payload);
  }

  async update(userId: string, payload: UserFormData): Promise<void> {
    await apiClient.put<unknown>(`/users/${userId}`, payload);
  }

  async delete(userId: string): Promise<void> {
    await apiClient.delete(`/users/${userId}`);
  }

  async getTeams(): Promise<string[]> {
    const data = await apiClient.get<{ teams?: string[] }>("/users/teams");
    return data.teams || [];
  }

  async exportUsers(): Promise<void> {
    const token = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.ID_TOKEN) : null;
    const res = await fetch(`${API_BASE_URL}/users/export`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error("Export failed");
    const base64 = await res.text();
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const blob = new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "skillsphere_users.xlsx";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // Team management
  async addTeam(name: string): Promise<string[]> {
    const data = await apiClient.post<{ teams?: string[] }>("/teams", { team_name: name });
    return data.teams || [];
  }

  async renameTeam(oldName: string, newName: string): Promise<string[]> {
    const data = await apiClient.put<{ teams?: string[] }>(`/teams/${encodeURIComponent(oldName)}`, { team_name: newName });
    return data.teams || [];
  }

  async deleteTeam(name: string): Promise<string[]> {
    const data = await apiClient.delete<{ teams?: string[] }>(`/teams/${encodeURIComponent(name)}`);
    return data.teams || [];
  }
}

export const userManagementService = new UserManagementService();
