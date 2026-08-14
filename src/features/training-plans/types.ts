export interface TrainingItem {
  sr_no: number;
  week: number;
  topic: string;
  skills: string;
  reference?: string;
  comments?: string;
}

export interface TrainingPlan {
  plan_id: string;
  plan_name: string;
  target_team?: string;
  target_role?: string;
  duration?: number;
  status?: string;
  description?: string;
  courses?: string;
  training_items?: TrainingItem[];
  created_at?: string;
  updated_at?: string;
}

export interface TrainingPlanFormData {
  plan_name: string;
  target_team?: string;
  target_role?: string;
  duration?: number;
  status?: string;
  description?: string;
  courses?: string;
  training_items?: TrainingItem[];
  update_all_users?: boolean;
}
