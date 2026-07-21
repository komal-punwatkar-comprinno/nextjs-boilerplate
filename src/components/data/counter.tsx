"use client";

import { useEffect, useRef, useState } from "react";

export interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Animated number counter using requestAnimationFrame for smooth counting.
 */
export function Counter({
  from = 0,
  to,
  duration = 1500,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: CounterProps) {
  const [value, setValue] = useState(from);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = null;

    function step(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;

      setValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    }

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [from, to, duration]);

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <span className={["tabular-nums", className].join(" ")}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
