import { apiClient } from "@/lib/api-client";
import type {
  LearningProgressListResponse,
  TrainingAssignment,
  AssignTrainingPayload,
  BulkAssignPayload,
  UpdateProgressPayload,
  ExtensionRequestPayload,
  ExtensionApprovalPayload,
  CurriculumTopic,
} from "./types";

/**
 * LearningProgressService — handles all learning progress API operations.
 *
 * Endpoints:
 * - GET    /learning-progress              → list (filtered by role on backend)
 * - POST   /learning-progress              → assign training
 * - POST   /learning-progress/bulk         → bulk assign
 * - PUT    /learning-progress/:id          → update record
 * - DELETE /learning-progress/:id          → delete record
 * - PUT    /learning-progress/:id/curriculum → save curriculum
 * - POST   /learning-progress/:id/request-extension  → request extension
 * - POST   /learning-progress/:id/approve-extension  → approve/reject extension
 * - GET    /learning-progress/extension-requests     → list pending extensions
 */
class LearningProgressService {
  private readonly basePath = "/learning-progress";

  /**
   * Fetch all learning progress records.
   * Backend filters by role automatically (member=own, manager=reports, admin=all).
   */
  async list(): Promise<TrainingAssignment[]> {
    const data = await apiClient.get<LearningProgressListResponse>(this.basePath);
    return data.items || [];
  }

  /**
   * Assign a training to a user.
   */
  async assign(payload: AssignTrainingPayload): Promise<{ progress_id: string; item: TrainingAssignment }> {
    return apiClient.post<{ progress_id: string; item: TrainingAssignment }>(this.basePath, payload);
  }

  /**
   * Bulk assign training to multiple users.
   */
  async bulkAssign(payload: BulkAssignPayload): Promise<{ results: unknown[] }> {
    return apiClient.post<{ results: unknown[] }>(`${this.basePath}/bulk`, payload);
  }

  /**
   * Update a learning progress record (status, dates, etc.).
   */
  async update(progressId: string, payload: UpdateProgressPayload): Promise<TrainingAssignment> {
    return apiClient.put<TrainingAssignment>(`${this.basePath}/${progressId}`, payload);
  }

  /**
   * Delete a learning progress record (admin only).
   */
  async delete(progressId: string): Promise<void> {
    return apiClient.delete(`${this.basePath}/${progressId}`);
  }

  /**
   * Save/update curriculum for a training record.
   */
  async saveCurriculum(progressId: string, curriculum: CurriculumTopic[]): Promise<void> {
    return apiClient.put<void>(`${this.basePath}/${progressId}/curriculum`, { curriculum });
  }

  /**
   * Request a deadline extension.
   */
  async requestExtension(progressId: string, payload: ExtensionRequestPayload): Promise<void> {
    return apiClient.post<void>(`${this.basePath}/${progressId}/request-extension`, payload);
  }

  /**
   * Approve or reject an extension request (admin/manager only).
   */
  async handleExtension(progressId: string, payload: ExtensionApprovalPayload): Promise<void> {
    return apiClient.post<void>(`${this.basePath}/${progressId}/approve-extension`, payload);
  }

  /**
   * Get all pending extension requests (admin/manager only).
   */
  async getExtensionRequests(): Promise<{ requests: TrainingAssignment[] }> {
    return apiClient.get<{ requests: TrainingAssignment[] }>(`${this.basePath}/extension-requests`);
  }
}

/** Singleton instance */
export const learningProgressService = new LearningProgressService();
