export interface User {
  user_id: string;
  name: string;
  email: string;
  role: string;
  team?: string;
  manager?: string;
  manager_name?: string;
  status?: string; // CONFIRMED, FORCE_CHANGE_PASSWORD, UNCONFIRMED, DISABLED, RESET_REQUIRED
}

export interface UserFormData {
  name: string;
  email: string;
  role: string;
  team?: string;
  manager?: string;
}
