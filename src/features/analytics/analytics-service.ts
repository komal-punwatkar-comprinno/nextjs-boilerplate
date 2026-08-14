import { apiClient } from "@/lib/api-client";
import type { AnalyticsData, KeyMetrics, CertDistribution, TeamTraining, OngoingCert, DelayedEmployee } from "./types";

/**
 * AnalyticsService — aggregates data from existing APIs.
 * No dedicated analytics endpoint — it fetches learning-progress, certification-progression, and users,
 * then processes the data client-side (matching the old analytics-dashboard.js).
 */
class AnalyticsService {
  async loadDashboard(): Promise<AnalyticsData> {
    const [learningData, certData, usersData] = await Promise.all([
      apiClient.get<{ items?: any[] }>("/learning-progress"),
      apiClient.get<{ data?: any[]; items?: any[] }>("/certification-progression"),
      apiClient.get<{ users?: any[] }>("/users"),
    ]);

    const learning = learningData.items || [];
    const certs = certData.data || certData.items || [];
    const users = usersData.users || [];

    return this.processData(learning, certs, users);
  }

  private processData(learning: any[], certs: any[], users: any[]): AnalyticsData {
    const now = new Date();

    // ── Key Metrics ──
    let totalCurriculum = 0;
    let completedCurriculum = 0;
    const memberWeeks: Record<string, number> = {};

    learning.forEach((l) => {
      const curriculum = l.curriculum || [];
      const email = l.user_email || l.email || "";
      totalCurriculum += curriculum.length;
      if (!memberWeeks[email]) memberWeeks[email] = 0;
      curriculum.forEach((c: any) => {
        if ((c.status || "").toLowerCase() === "completed") {
          completedCurriculum++;
          memberWeeks[email] += parseInt(c.week) || 1;
        }
      });
    });

    const completionRate = totalCurriculum > 0 ? Math.round((completedCurriculum / totalCurriculum) * 100) : 0;
    const totalMemberWeeks = Object.values(memberWeeks).reduce((s, w) => s + w, 0);
    const numberOfMembers = Object.keys(memberWeeks).length || 1;
    const avgHours = Math.round((totalMemberWeeks / numberOfMembers) * 40);

    const activeLearners = new Set(
      learning.filter((l) => {
        const s = (l.status || "").toLowerCase();
        return s === "in progress" || s === "not started";
      }).map((l) => l.user_email || l.email)
    ).size;

    const delayedMembers = learning.filter((l) => {
      const s = (l.status || "").toLowerCase();
      const target = l.target_date;
      return s !== "completed" && target && new Date(target) < now;
    }).length;

    const metrics: KeyMetrics = { coursesCompleted: completedCurriculum, completionRate, activeLearners, avgHours, delayedMembers };

    // ── Certification Distribution ──
    const certCounts: Record<string, number> = {};
    certs.forEach((c) => {
      const name = c.certification_name || c.name || "Unknown";
      certCounts[name] = (certCounts[name] || 0) + 1;
    });
    const totalCerts = Object.values(certCounts).reduce((s, c) => s + c, 0);
    const certDistribution: CertDistribution[] = Object.entries(certCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([name, count]) => ({ name, count, percentage: totalCerts > 0 ? parseFloat(((count / totalCerts) * 100).toFixed(1)) : 0 }));

    // ── Team Training Distribution ──
    const teamCounts: Record<string, number> = {};
    learning.forEach((l) => {
      const team = l.team || "No Team";
      teamCounts[team] = (teamCounts[team] || 0) + 1;
    });
    const teamTraining: TeamTraining[] = Object.entries(teamCounts).map(([team, count]) => ({ team, count }));

    // ── Ongoing Certifications ──
    const ongoingCerts: OngoingCert[] = certs
      .filter((c) => (c.status || "").toLowerCase() === "in progress")
      .map((c) => ({
        employeeName: c.member_name || c.user_name || "Unknown",
        certificationName: c.certification_name || "Unknown",
        status: "In Progress",
        comments: c.comments || "-",
      }));

    // ── Delayed Employees ──
    const userMap: Record<string, any> = {};
    users.forEach((u) => { userMap[u.email || ""] = u; });

    const userCertsMap: Record<string, any[]> = {};
    certs.forEach((c) => {
      const key = c.user_email || c.member_name || "";
      if (!key) return;
      if (!userCertsMap[key]) userCertsMap[key] = [];
      userCertsMap[key].push(c);
    });

    const employeeAgg: Record<string, any> = {};
    learning.forEach((l) => {
      const email = l.user_email || "";
      if (!employeeAgg[email]) {
        const u = userMap[email] || {};
        employeeAgg[email] = { name: u.name || l.user_name || email, role: u.team || l.team || "N/A", total: 0, completed: 0, delayed: 0, hasDelayed: false, comment: "", courses: [] };
      }
      const agg = employeeAgg[email];
      const curriculum = l.curriculum || [];
      if (curriculum.length > 0) {
        agg.total += curriculum.length;
        agg.completed += curriculum.filter((c: any) => (c.status || "").toLowerCase() === "completed").length;
      } else {
        agg.total += 1;
        if ((l.status || "").toLowerCase() === "completed") agg.completed++;
      }
      if ((l.status || "").toLowerCase() !== "completed" && l.target_date && new Date(l.target_date) < now) {
        agg.delayed++;
        agg.hasDelayed = true;
        if (l.extension_reason && !agg.comment) agg.comment = l.extension_reason;
      }
      const course = l.course_name || l.training || "";
      if (course && !agg.courses.includes(course)) agg.courses.push(course);
    });

    const delayedEmployees: DelayedEmployee[] = Object.entries(employeeAgg)
      .filter(([, agg]: any) => agg.hasDelayed)
      .map(([email, agg]: any) => {
        const userCerts = userCertsMap[email] || [];
        return {
          name: agg.name,
          role: agg.role,
          total: agg.total,
          completed: agg.completed,
          delayed: agg.delayed,
          comment: agg.comment || "NA",
          recentCerts: userCerts.filter((c: any) => (c.status || "").toLowerCase() === "completed").map((c: any) => c.certification_name).filter(Boolean).join(", ") || "NA",
          ongoingCerts: userCerts.filter((c: any) => (c.status || "").toLowerCase() === "in progress").map((c: any) => c.certification_name).filter(Boolean).join(", ") || "NA",
          courses: agg.courses.join(", ") || "-",
        };
      })
      .sort((a, b) => b.delayed - a.delayed)
      .slice(0, 20);

    return { metrics, certDistribution, teamTraining, ongoingCerts, delayedEmployees };
  }
}

export const analyticsService = new AnalyticsService();
