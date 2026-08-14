export interface KeyMetrics {
  coursesCompleted: number;
  completionRate: number;
  activeLearners: number;
  avgHours: number;
  delayedMembers: number;
}

export interface CertDistribution {
  name: string;
  count: number;
  percentage: number;
}

export interface TeamTraining {
  team: string;
  count: number;
}

export interface OngoingCert {
  employeeName: string;
  certificationName: string;
  status: string;
  comments: string;
}

export interface DelayedEmployee {
  name: string;
  role: string;
  total: number;
  completed: number;
  delayed: number;
  comment: string;
  recentCerts: string;
  ongoingCerts: string;
  courses: string;
}

export interface AnalyticsData {
  metrics: KeyMetrics;
  certDistribution: CertDistribution[];
  teamTraining: TeamTraining[];
  ongoingCerts: OngoingCert[];
  delayedEmployees: DelayedEmployee[];
}
