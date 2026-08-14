/**
 * Certification Progress feature types.
 */

export type CertificationStatus = "Not started" | "In Progress" | "Completed";
export type ExtensionStatus = "pending" | "approved" | "rejected" | null;

export interface CertificationRecord {
  record_id: string;
  member_name: string;
  certification_name: string;
  status: CertificationStatus;
  target_date?: string;
  completion_date?: string;
  completed_date?: string;
  comments?: string;
  certification_image?: string;
  team?: string;
  extension_status?: ExtensionStatus;
  extension_new_date?: string;
  extension_reason?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CertificationFormData {
  member_name: string;
  certification_name: string;
  status: string;
  target_date?: string;
  completion_date?: string;
  comments?: string;
  certification_image?: string;
}

export interface ExtensionRequestPayload {
  new_target_date: string;
  reason: string;
}

export interface MemberCertGroup {
  member: string;
  team: string;
  certifications: CertificationRecord[];
}

export interface CertificationStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
}
