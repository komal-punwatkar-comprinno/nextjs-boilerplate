import { apiClient } from "@/lib/api-client";
import type { SkillsetTemplate, TemplateFormData } from "./types";

class SkillsetTemplateService {
  private readonly basePath = "/skillset-templates";

  async list(): Promise<SkillsetTemplate[]> {
    const data = await apiClient.get<{ templates?: SkillsetTemplate[] }>(this.basePath);
    return data.templates || [];
  }

  async create(payload: TemplateFormData): Promise<{ template_id: string }> {
    return apiClient.post<{ template_id: string }>(this.basePath, payload);
  }

  async update(templateId: string, payload: TemplateFormData): Promise<void> {
    await apiClient.put<unknown>(`${this.basePath}/${templateId}`, payload);
  }

  async delete(templateId: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${templateId}`);
  }

  async getTeams(): Promise<string[]> {
    const data = await apiClient.get<{ teams?: string[] }>("/users/teams");
    return data.teams || [];
  }
}

export const skillsetTemplateService = new SkillsetTemplateService();
