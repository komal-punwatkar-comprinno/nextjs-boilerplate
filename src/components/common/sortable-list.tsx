"use client";

import { useCallback, useRef, useState } from "react";

export interface SortableListProps<T> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number, dragHandleProps: DragHandleProps) => React.ReactNode;
  className?: string;
}

export interface DragHandleProps {
  onPointerDown: (e: React.PointerEvent) => void;
  style?: React.CSSProperties;
  "aria-label": string;
}

/**
 * Drag-and-drop reorderable list using pointer events (no external dependencies).
 */
export function SortableList<T>({
  items,
  onReorder,
  renderItem,
  className = "",
}: SortableListProps<T>) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const itemRects = useRef<DOMRect[]>([]);

  const captureRects = useCallback(() => {
    if (!containerRef.current) return;
    const children = containerRef.current.children;
    itemRects.current = Array.from(children).map((el) => el.getBoundingClientRect());
  }, []);

  const handlePointerDown = useCallback(
    (index: number) => (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setDragIndex(index);
      setOverIndex(index);
      dragStartY.current = e.clientY;
      captureRects();
    },
    [captureRects]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragIndex === null) return;

      const currentY = e.clientY;
      const rects = itemRects.current;

      for (let i = 0; i < rects.length; i++) {
        const rect = rects[i];
        const midY = rect.top + rect.height / 2;
        if (currentY < midY) {
          setOverIndex(i);
          return;
        }
      }
      setOverIndex(rects.length - 1);
    },
    [dragIndex]
  );

  const handlePointerUp = useCallback(() => {
    if (dragIndex === null || overIndex === null) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }

    if (dragIndex !== overIndex) {
      const newItems = [...items];
      const [moved] = newItems.splice(dragIndex, 1);
      newItems.splice(overIndex, 0, moved);
      onReorder(newItems);
    }

    setDragIndex(null);
    setOverIndex(null);
  }, [dragIndex, overIndex, items, onReorder]);

  return (
    <div
      ref={containerRef}
      className={["flex flex-col gap-1", className].join(" ")}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {items.map((item, index) => {
        const isDragging = dragIndex === index;
        const isOver = overIndex === index && dragIndex !== null && dragIndex !== index;

        const dragHandleProps: DragHandleProps = {
          onPointerDown: handlePointerDown(index),
          style: { cursor: "grab", touchAction: "none" },
          "aria-label": `Drag to reorder item ${index + 1}`,
        };

        return (
          <div
            key={index}
            className={[
              "transition-all duration-150",
              isDragging ? "z-10 scale-[1.02] opacity-70" : "",
              isOver ? "border-t-2 border-[#4CCBBF]" : "",
            ].join(" ")}
          >
            {renderItem(item, index, dragHandleProps)}
          </div>
        );
      })}
    </div>
  );
}
