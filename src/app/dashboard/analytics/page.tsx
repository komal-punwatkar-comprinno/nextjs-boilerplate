import type { Metadata } from "next";
import { ComingSoon } from "@/app/dashboard/_components/coming-soon";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Track metrics, trends, and key performance indicators.",
};

export default function AnalyticsPage() {
  return (
    <ComingSoon
      icon="📊"
      title="Analytics"
      description="Track metrics, visualise trends, and monitor key performance indicators across your workspace."
      features={[
        "Revenue & growth charts",
        "User acquisition funnel",
        "Retention and churn metrics",
        "Custom date-range filtering",
        "CSV / PDF export",
        "Real-time data refresh",
      ]}
      implementationHint="Create your analytics service at src/services/analytics-service.ts and add chart components under src/features/analytics/."
    />
  );
}

