export interface SkillsetTemplate {
  template_id: string;
  template_name: string;
  description?: string;
  skills: string[];
  status?: string; // Active | Inactive
  target_team?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TemplateFormData {
  template_name: string;
  description?: string;
  skills: string[];
  status?: string;
  target_team?: string;
}
