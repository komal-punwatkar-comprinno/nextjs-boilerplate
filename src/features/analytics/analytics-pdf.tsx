"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { AnalyticsData } from "@/features/analytics";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: "Helvetica" },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 5, color: "#1B2A49" },
  subheader: { fontSize: 9, color: "#666", marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginBottom: 8, color: "#1B2A49", marginTop: 15 },

  // Metrics row
  metricsRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  metricCard: { flex: 1, border: "1px solid #e2e8f0", borderRadius: 6, padding: 10 },
  metricLabel: { fontSize: 8, color: "#64748b", marginBottom: 2 },
  metricValue: { fontSize: 16, fontWeight: "bold", color: "#1B2A49" },
  metricSub: { fontSize: 7, color: "#94a3b8", marginTop: 2 },

  // Table
  table: { marginTop: 8 },
  tableHeader: { flexDirection: "row", borderBottom: "1px solid #e2e8f0", paddingBottom: 4, marginBottom: 4 },
  tableRow: { flexDirection: "row", paddingVertical: 3, borderBottom: "0.5px solid #f1f5f9" },
  thCell: { fontSize: 8, fontWeight: "bold", color: "#64748b" },
  tdCell: { fontSize: 9, color: "#334155" },

  // Cert distribution
  certRow: { flexDirection: "row", alignItems: "center", paddingVertical: 3, borderBottom: "0.5px solid #f1f5f9" },
  colorDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },

  // Bar chart (simple text-based)
  barRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  barLabel: { width: 70, fontSize: 8, color: "#64748b", textAlign: "right", marginRight: 8 },
  barContainer: { flex: 1, height: 14, backgroundColor: "#f1f5f9", borderRadius: 3 },
  bar: { height: 14, backgroundColor: "#1B2A49", borderRadius: 3 },
  barValue: { fontSize: 8, color: "#1B2A49", marginLeft: 6, fontWeight: "bold" },
});

const COLORS = ["#1B2A49", "#FF9472", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899"];

interface AnalyticsPDFProps {
  data: AnalyticsData;
}

export function AnalyticsPDF({ data }: AnalyticsPDFProps) {
  const { metrics, certDistribution, teamTraining, ongoingCerts, delayedEmployees } = data;
  const maxTeamCount = Math.max(...teamTraining.map((t) => t.count), 1);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>Analytics Dashboard</Text>
        <Text style={styles.subheader}>Generated: {new Date().toLocaleString()}</Text>

        {/* Metrics */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Courses Completed</Text>
            <Text style={styles.metricValue}>{metrics.coursesCompleted}</Text>
            <Text style={styles.metricSub}>{metrics.completionRate}% completion rate</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Active Learners</Text>
            <Text style={styles.metricValue}>{metrics.activeLearners}</Text>
            <Text style={styles.metricSub}>Currently in training</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Avg Learning Hours</Text>
            <Text style={styles.metricValue}>{metrics.avgHours}h</Text>
            <Text style={styles.metricSub}>Per member average</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Delayed Training</Text>
            <Text style={{ ...styles.metricValue, color: "#dc2626" }}>{metrics.delayedMembers}</Text>
            <Text style={styles.metricSub}>Past deadline</Text>
          </View>
        </View>

        {/* Certification Distribution */}
        <Text style={styles.sectionTitle}>Certification Distribution</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={{ ...styles.thCell, width: 20 }}>#</Text>
            <Text style={{ ...styles.thCell, flex: 1 }}>Certification</Text>
            <Text style={{ ...styles.thCell, width: 40, textAlign: "right" }}>Count</Text>
            <Text style={{ ...styles.thCell, width: 40, textAlign: "right" }}>%</Text>
          </View>
          {certDistribution.slice(0, 15).map((c, i) => (
            <View key={c.name} style={styles.certRow}>
              <View style={{ ...styles.colorDot, backgroundColor: COLORS[i % COLORS.length] }} />
              <Text style={{ ...styles.tdCell, flex: 1 }}>{c.name}</Text>
              <Text style={{ ...styles.tdCell, width: 40, textAlign: "right", fontWeight: "bold" }}>{c.count}</Text>
              <Text style={{ ...styles.tdCell, width: 40, textAlign: "right", color: "#64748b" }}>{c.percentage}%</Text>
            </View>
          ))}
        </View>

        {/* Training by Teams */}
        <Text style={styles.sectionTitle}>Training Distribution by Teams</Text>
        {teamTraining.map((t) => (
          <View key={t.team} style={styles.barRow}>
            <Text style={styles.barLabel}>{t.team}</Text>
            <View style={styles.barContainer}>
              <View style={{ ...styles.bar, width: `${(t.count / maxTeamCount) * 100}%` }} />
            </View>
            <Text style={styles.barValue}>{t.count}</Text>
          </View>
        ))}
      </Page>

      {/* Page 2: Tables */}
      <Page size="A4" style={styles.page}>
        {/* Ongoing Certifications */}
        <Text style={styles.sectionTitle}>Ongoing Certifications ({ongoingCerts.length})</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={{ ...styles.thCell, flex: 1 }}>Employee</Text>
            <Text style={{ ...styles.thCell, flex: 1 }}>Certification</Text>
            <Text style={{ ...styles.thCell, width: 60 }}>Status</Text>
            <Text style={{ ...styles.thCell, flex: 1 }}>Comments</Text>
          </View>
          {ongoingCerts.slice(0, 25).map((c, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={{ ...styles.tdCell, flex: 1 }}>{c.employeeName}</Text>
              <Text style={{ ...styles.tdCell, flex: 1 }}>{c.certificationName}</Text>
              <Text style={{ ...styles.tdCell, width: 60, color: "#3b82f6" }}>In Progress</Text>
              <Text style={{ ...styles.tdCell, flex: 1 }}>{c.comments}</Text>
            </View>
          ))}
        </View>

        {/* Delayed Employees */}
        <Text style={styles.sectionTitle}>Employees with Delayed Training ({delayedEmployees.length})</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={{ ...styles.thCell, flex: 1 }}>Employee</Text>
            <Text style={{ ...styles.thCell, width: 50 }}>Team</Text>
            <Text style={{ ...styles.thCell, width: 30, textAlign: "center" }}>Total</Text>
            <Text style={{ ...styles.thCell, width: 30, textAlign: "center" }}>Done</Text>
            <Text style={{ ...styles.thCell, width: 40, textAlign: "center" }}>Delayed</Text>
            <Text style={{ ...styles.thCell, flex: 1 }}>Courses</Text>
          </View>
          {delayedEmployees.slice(0, 20).map((d, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={{ ...styles.tdCell, flex: 1 }}>{d.name}</Text>
              <Text style={{ ...styles.tdCell, width: 50 }}>{d.role}</Text>
              <Text style={{ ...styles.tdCell, width: 30, textAlign: "center" }}>{d.total}</Text>
              <Text style={{ ...styles.tdCell, width: 30, textAlign: "center", color: "#10b981" }}>{d.completed}</Text>
              <Text style={{ ...styles.tdCell, width: 40, textAlign: "center", color: "#dc2626", fontWeight: "bold" }}>{d.delayed}</Text>
              <Text style={{ ...styles.tdCell, flex: 1 }}>{d.courses.slice(0, 50)}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
