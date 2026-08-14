import { apiClient } from "@/lib/api-client";
import type {
  HeatmapResponse,
  TemplatesResponse,
  RatingPayload,
  CommentPayload,
  BulkAssignPayload,
  HeatmapMember,
} from "./types";

class SkillsetHeatmapService {
  /** GET /skillset-heatmap — all members with their skills */
  async getHeatmap(): Promise<HeatmapMember[]> {
    const data = await apiClient.get<HeatmapResponse>("/skillset-heatmap");
    return data.members || [];
  }

  /** GET /skillset-templates */
  async getTemplates(): Promise<TemplatesResponse> {
    return apiClient.get<TemplatesResponse>("/skillset-templates");
  }

  /** POST /skillset-heatmap/rating — save a rating (with mandatory comment) */
  async saveRating(payload: RatingPayload): Promise<void> {
    await apiClient.post<unknown>("/skillset-heatmap/rating", payload);
  }

  /** POST /skillset-heatmap/comments — save a role-based comment */
  async saveComment(payload: CommentPayload): Promise<void> {
    await apiClient.post<unknown>("/skillset-heatmap/comments", payload);
  }

  /** POST /skillset-assignments/bulk — assign templates to users */
  async bulkAssign(payload: BulkAssignPayload): Promise<void> {
    await apiClient.post<unknown>("/skillset-assignments/bulk", payload);
  }

  /** GET /skillset-heatmap/pending-manager-approvals */
  async getPendingApprovals(): Promise<unknown[]> {
    const data = await apiClient.get<{ items?: unknown[] }>("/skillset-heatmap/pending-manager-approvals");
    return data.items || [];
  }

  /** POST /skillset-heatmap/verify — approve a rating */
  async verifyRating(userId: string, skillName: string): Promise<void> {
    await apiClient.post<unknown>("/skillset-heatmap/verify", { user_id: userId, skill_name: skillName });
  }

  /** POST /skillset-heatmap/:id/reject — reject a rating (id = userId::skillName) */
  async rejectRating(userId: string, skillName: string, reason: string): Promise<void> {
    const recordId = encodeURIComponent(`${userId}::${skillName}`);
    await apiClient.post<unknown>(`/skillset-heatmap/${recordId}/reject`, { reason });
  }

  /** DELETE /skillset-heatmap/:memberName — delete all skills for a member */
  async deleteSkillset(memberName: string): Promise<void> {
    await apiClient.delete(`/skillset-heatmap/${encodeURIComponent(memberName)}`);
  }

  /** DELETE /skillset-heatmap/:memberName?template=:templateName — delete a specific template's skills */
  async deleteTemplate(memberName: string, templateName: string): Promise<void> {
    await apiClient.delete(`/skillset-heatmap/${encodeURIComponent(memberName)}`, {
      params: { template: templateName },
    });
  }
}

export const skillsetHeatmapService = new SkillsetHeatmapService();
