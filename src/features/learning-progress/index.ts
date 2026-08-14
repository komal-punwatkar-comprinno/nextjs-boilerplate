/**
 * Learning Progress feature module.
 *
 * Public API — import from "@/features/learning-progress".
 */
export { learningProgressService } from "./learning-progress-service";
export type {
  CurriculumTopic,
  TrainingAssignment,
  EnrichedTrainingRecord,
  MemberGroup,
  LearningProgressListResponse,
  AssignTrainingPayload,
  BulkAssignPayload,
  UpdateProgressPayload,
  ExtensionRequestPayload,
  ExtensionApprovalPayload,
  LearningProgressFilters,
  ExtensionStatus,
  ExtensionType,
} from "./types";
