"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { AnalyticsPDF } from "@/features/analytics/analytics-pdf";
import { Icon } from "@/components/ui/icon";
import type { AnalyticsData } from "@/features/analytics";

interface PDFExportButtonProps {
  data: AnalyticsData;
}

export default function PDFExportButton({ data }: PDFExportButtonProps) {
  return (
    <PDFDownloadLink
      document={<AnalyticsPDF data={data} />}
      fileName={`Analytics_Dashboard_${new Date().toISOString().split("T")[0]}.pdf`}
      className="inline-flex h-8 items-center gap-2 rounded-md bg-[#1b2a49] px-3 text-xs font-medium text-white transition-colors hover:bg-[#2a3d5f] dark:bg-[#ff9472] dark:text-[#1b2a49] dark:hover:bg-[#e8845f]"
    >
      {({ loading }) => (
        <>
          <Icon name="download" size="sm" />
          {loading ? "Generating..." : "Export to PDF"}
        </>
      )}
    </PDFDownloadLink>
  );
}
