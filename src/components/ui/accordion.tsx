"use client";
  
  import { useState } from "react";
  
  export interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
  }
  
  export interface AccordionProps {
    items: AccordionItem[];
    /** Allow multiple panels open at once. Defaults to false (single open). */
    multiple?: boolean;
    /** ID of the item open by default. */
    defaultOpenId?: string;
    className?: string;
  }
  
  /**
   * Vertically collapsing accordion.
   *
   * @example
   * <Accordion
   *   defaultOpenId="item-1"
   *   items={[
   *     { id: "item-1", title: "Question one", content: "Answer one" },
   *     { id: "item-2", title: "Question two", content: "Answer two" },
   *   ]}
   * />
   */
  export function Accordion({
    items,
    multiple = false,
    defaultOpenId,
    className = "",
  }: AccordionProps) {
    const [openIds, setOpenIds] = useState<Set<string>>(
      new Set(defaultOpenId ? [defaultOpenId] : [])
    );
  
    function toggle(id: string) {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!multiple) next.clear();
          next.add(id);
        }
        return next;
      });
    }
  
    return (
      <div
        className={`overflow-hidden rounded-lg border border-zinc-200 dark:border-[#2D3640] ${className}`}
      >
        {items.map((item) => {
          const isOpen = openIds.has(item.id);
          return (
            <div
              key={item.id}
              className="border-b border-zinc-200 last:border-0 dark:border-[#2D3640]"
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50 dark:text-[#E2E8F0] dark:hover:bg-[#252D3A]"
              >
                <span className={isOpen ? "text-[#4CCBBF]" : ""}>{item.title}</span>
                <span className="ml-4 shrink-0 text-lg leading-none">
                  {isOpen ? (
                    <span className="text-[#4CCBBF]">−</span>
                  ) : (
                    <span className="text-zinc-400 dark:text-[#64748B]">+</span>
                  )}
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-sm leading-relaxed text-zinc-600 dark:text-[#9FAEC1]">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
