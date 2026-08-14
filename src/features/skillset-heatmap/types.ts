/**
 * Skillset Heatmap feature types.
 */

export interface SkillData {
  rating: number;
  comments?: string;
  comments_by?: string;
  comments_at?: string;
  manager_comments?: string;
  manager_comments_by?: string;
  manager_comments_at?: string;
  admin_comments?: string;
  admin_comments_by?: string;
  admin_comments_at?: string;
  template_name?: string;
  updated_by_name?: string;
  updated_by_role?: string;
  updated_at?: string;
}

export interface HeatmapMember {
  user_email: string;
  member_name: string;
  team?: string;
  skills: Record<string, SkillData>;
}

export interface HeatmapResponse {
  members: HeatmapMember[];
}

export interface SkillTemplate {
  template_id: string;
  template_name: string;
  skills: string | string[];
  created_at?: string;
}

export interface TemplatesResponse {
  templates: SkillTemplate[];
}

export interface RatingPayload {
  target_user_email: string;
  skill_name: string;
  rating: number;
  comments: string;
}

export interface CommentPayload {
  user_email: string;
  skill_name: string;
  comment_type: "user" | "manager" | "admin";
  comments: string;
}

export interface BulkAssignPayload {
  assignments: { user_email: string; template_id: string }[];
}

/** Computed stats for a member card */
export interface MemberStats {
  avgRating: number;
  skillCount: number;
  ratingColor: string;
}
