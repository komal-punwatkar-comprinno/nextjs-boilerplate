"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components";

/** Skeleton loader for page header + filter bar + card grid */
export function PageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton variant="text" width="180px" height="24px" />
          <Skeleton variant="text" width="120px" height="14px" className="mt-2" />
        </div>
        <Skeleton variant="rectangular" width="120px" height="36px" />
      </div>

      {/* Filter bar skeleton */}
      <Card className="p-4">
        <div className="flex gap-3">
          <Skeleton variant="rectangular" height="36px" className="flex-1" />
          <Skeleton variant="rectangular" width="140px" height="36px" />
          <Skeleton variant="rectangular" width="140px" height="36px" />
        </div>
      </Card>

      {/* Card grid skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cards }).map((_, i) => (
          <Card key={i} className="p-5 space-y-3">
            <div className="flex justify-between">
              <Skeleton variant="text" width="60%" height="16px" />
              <Skeleton variant="rectangular" width="50px" height="18px" />
            </div>
            <Skeleton variant="text" width="80%" height="12px" />
            <Skeleton variant="text" width="40%" height="12px" />
            <div className="flex gap-1 pt-2">
              <Skeleton variant="rectangular" width="32px" height="16px" />
              <Skeleton variant="rectangular" width="32px" height="16px" />
              <Skeleton variant="rectangular" width="32px" height="16px" />
              <Skeleton variant="rectangular" width="32px" height="16px" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/** Skeleton loader for table pages (user management, analytics) */
export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton variant="text" width="200px" height="24px" />
          <Skeleton variant="text" width="100px" height="14px" className="mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width="100px" height="36px" />
          <Skeleton variant="rectangular" width="100px" height="36px" />
        </div>
      </div>

      <Card className="p-4">
        <div className="flex gap-3">
          <Skeleton variant="rectangular" height="36px" className="flex-1" />
          <Skeleton variant="rectangular" width="120px" height="36px" />
          <Skeleton variant="rectangular" width="120px" height="36px" />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="p-4 space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton variant="text" width="20%" height="14px" />
              <Skeleton variant="text" width="25%" height="14px" />
              <Skeleton variant="rectangular" width="60px" height="20px" />
              <Skeleton variant="text" width="15%" height="14px" />
              <Skeleton variant="text" width="15%" height="14px" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/** Skeleton loader for list pages (learning progress, certifications) */
export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton variant="text" width="200px" height="24px" />
          <Skeleton variant="text" width="120px" height="14px" className="mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width="140px" height="36px" />
          <Skeleton variant="rectangular" width="120px" height="36px" />
        </div>
      </div>

      <Card className="p-4">
        <div className="flex gap-3">
          <Skeleton variant="rectangular" height="36px" className="flex-1" />
          <Skeleton variant="rectangular" width="100px" height="36px" />
          <Skeleton variant="rectangular" width="100px" height="36px" />
        </div>
      </Card>

      <div className="space-y-3">
        {Array.from({ length: items }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <Skeleton variant="circular" width="44px" height="44px" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" width="50%" height="14px" />
                <Skeleton variant="text" width="30%" height="12px" />
              </div>
              <Skeleton variant="rectangular" width="80px" height="24px" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
