/**
 * Learning Progress feature types.
 * Matches the DynamoDB schema used by the Lambda backend.
 */

// ─── Curriculum ──────────────────────────────────────────────────────────────

export interface CurriculumTopic {
  week: number;
  topic: string;
  status: "Not Started" | "In Progress" | "Completed";
  sr_no?: number;
  reference?: string;
  skills?: string;
  comments?: string;
  updated_at: string | null;
  updated_by: string | null;
}

// ─── Extension ───────────────────────────────────────────────────────────────

export type ExtensionStatus = "pending" | "approved" | "rejected" | null;
export type ExtensionType = "week" | "full" | null;

// ─── Training Assignment (raw from API) ──────────────────────────────────────

export interface TrainingAssignment {
  progress_id: string;
  user_id: string;
  user_email: string;
  user_name?: string;
  training_id: string;
  course_name?: string;
  training?: string;
  status: "Not Started" | "In Progress" | "Completed";
  assigned_date?: string;
  target_date?: string;
  start_date?: string;
  end_date?: string;
  duration?: string | number;
  manager_email?: string;
  team?: string;
  curriculum?: CurriculumTopic[];
  extension_status?: ExtensionStatus;
  extension_type?: ExtensionType;
  extension_week_number?: number | string;
  extension_new_date?: string;
  extension_rejection_reason?: string;
  extension_approved_at?: string;
  previous_extension_type?: string;
  previous_extension_week_number?: number | string;
  created_at?: string;
  updated_at?: string;
}

// ─── Enriched Record (with computed fields for UI) ───────────────────────────

export interface EnrichedTrainingRecord extends TrainingAssignment {
  /** Computed progress percentage (0-100) based on curriculum completion */
  progress: number;
  /** True if trainee is behind schedule */
  isDelayed: boolean;
  /** Weeks that are behind schedule */
  delayedWeeks: { week: number; incomplete: number; total: number }[];
  /** Status considering curriculum progress (may override raw status) */
  effective_status: "Not Started" | "In Progress" | "Completed";
  /** Normalized display name */
  display_name: string;
  /** Normalized course name */
  display_course: string;
  /** Normalized team */
  display_team: string;
}

// ─── Grouped View (admin/manager) ────────────────────────────────────────────

export interface MemberGroup {
  email: string;
  name: string;
  team: string;
  records: EnrichedTrainingRecord[];
  stats: {
    completed: number;
    inProgress: number;
    notStarted: number;
    overdue: number;
  };
  totalProgress: number;
}

// ─── API Request/Response ────────────────────────────────────────────────────

export interface LearningProgressListResponse {
  items: TrainingAssignment[];
}

export interface AssignTrainingPayload {
  user_email: string;
  training_id: string;
  course_name: string;
  training?: string;
  start_date?: string;
  end_date?: string;
  target_date?: string;
  duration?: string | number;
  manager_email?: string;
  status?: string;
}

export interface BulkAssignPayload {
  assignments: AssignTrainingPayload[];
}

export interface UpdateProgressPayload {
  status?: string;
  target_date?: string;
  end_date?: string;
  [key: string]: unknown;
}

export interface ExtensionRequestPayload {
  extension_type: "week" | "full";
  extension_week_number?: number;
  extension_new_date?: string;
  reason?: string;
}

export interface ExtensionApprovalPayload {
  action: "approve" | "reject";
  extension_new_date?: string;
  rejection_reason?: string;
}

// ─── Filters ─────────────────────────────────────────────────────────────────

export interface LearningProgressFilters {
  status: string;
  member: string;
  extension: string;
  team: string;
  search: string;
}
