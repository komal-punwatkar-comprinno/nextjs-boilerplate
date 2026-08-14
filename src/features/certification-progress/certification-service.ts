import { apiClient } from "@/lib/api-client";
import type {
  CertificationRecord,
  CertificationFormData,
  ExtensionRequestPayload,
} from "./types";

/**
 * CertificationService — handles all certification progress API operations.
 *
 * Endpoints:
 * - GET    /certification-progression                        → list
 * - POST   /certification-progression                        → create
 * - PUT    /certification-progression/:id                    → update
 * - DELETE /certification-progression/:id                    → delete
 * - POST   /certification-progression/:id/request-extension  → request extension
 * - GET    /certification-progression/extension-requests      → pending extensions
 * - POST   /certification-progression/:id/approve-extension   → approve
 * - POST   /certification-progression/:id/reject-extension    → reject
 */
class CertificationService {
  private readonly basePath = "/certification-progression";

  /** Fetch all certification records (backend filters by role). */
  async list(): Promise<CertificationRecord[]> {
    const data = await apiClient.get<{ data?: CertificationRecord[]; items?: CertificationRecord[] }>(this.basePath);
    return data.data || data.items || [];
  }

  /** Create a new certification record. */
  async create(payload: CertificationFormData): Promise<{ success: boolean; record_id?: string }> {
    return apiClient.post<{ success: boolean; record_id?: string }>(this.basePath, payload);
  }

  /** Update an existing certification record. */
  async update(recordId: string, payload: CertificationFormData): Promise<{ success: boolean }> {
    return apiClient.put<{ success: boolean }>(`${this.basePath}/${recordId}`, payload);
  }

  /** Delete a certification record. */
  async delete(recordId: string): Promise<{ success: boolean }> {
    return apiClient.delete<{ success: boolean }>(`${this.basePath}/${recordId}`);
  }

  /** Request a deadline extension (member). */
  async requestExtension(recordId: string, payload: ExtensionRequestPayload): Promise<{ success: boolean }> {
    return apiClient.post<{ success: boolean }>(`${this.basePath}/${recordId}/request-extension`, payload);
  }

  /** Get all pending extension requests (admin/manager). */
  async getExtensionRequests(): Promise<CertificationRecord[]> {
    const data = await apiClient.get<{ items?: CertificationRecord[] }>(`${this.basePath}/extension-requests`);
    return data.items || [];
  }

  /** Approve an extension request (admin/manager). */
  async approveExtension(recordId: string): Promise<{ success: boolean }> {
    return apiClient.post<{ success: boolean }>(`${this.basePath}/${recordId}/approve-extension`, {});
  }

  /** Reject an extension request (admin/manager). */
  async rejectExtension(recordId: string, reason: string): Promise<{ success: boolean }> {
    return apiClient.post<{ success: boolean }>(`${this.basePath}/${recordId}/reject-extension`, { reason });
  }
}

export const certificationService = new CertificationService();
