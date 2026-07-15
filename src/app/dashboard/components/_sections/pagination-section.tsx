"use client";

import { useState } from "react";
import { Pagination } from "@/components/pagination";
import { SectionWrapper } from "./section-wrapper";

export function PaginationSection() {
  const [page, setPage] = useState(1);
  const totalPages = 10;

  return (
    <SectionWrapper id="pagination" title="9. Pagination">
      <div className="space-y-6">
        <p className="text-sm text-slate-600">
          Live demo — click the buttons to change pages. Currently on page{" "}
          <strong className="font-semibold text-indigo-600">{page}</strong> of{" "}
          <strong className="font-semibold text-slate-800">{totalPages}</strong>.
        </p>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          siblingCount={1}
        />

        {/* Visual feedback */}
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-1">
            Showing page
          </p>
          <p className="text-5xl font-bold text-indigo-600">{page}</p>
          <p className="mt-1 text-xs text-slate-400">of {totalPages} pages</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
