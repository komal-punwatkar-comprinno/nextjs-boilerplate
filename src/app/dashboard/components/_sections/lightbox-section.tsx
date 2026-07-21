"use client";

import { useState } from "react";
import { Lightbox } from "@/components";
import { SectionWrapper } from "./section-wrapper";

const images = [
  { src: "https://placehold.co/800x600/e2e8f0/64748b?text=Image+1", alt: "Gallery image 1", caption: "Mountain landscape" },
  { src: "https://placehold.co/800x600/e2e8f0/64748b?text=Image+2", alt: "Gallery image 2", caption: "Ocean sunset" },
  { src: "https://placehold.co/800x600/e2e8f0/64748b?text=Image+3", alt: "Gallery image 3", caption: "City skyline" },
  { src: "https://placehold.co/800x600/e2e8f0/64748b?text=Image+4", alt: "Gallery image 4", caption: "Forest trail" },
];

export function LightboxSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  function openAt(index: number) {
    setInitialIndex(index);
    setIsOpen(true);
  }

  return (
    <SectionWrapper id="lightbox" title="Lightbox">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Image Gallery
          </p>
          <p className="mb-4 text-sm text-zinc-600 dark:text-[#9FAEC1]">
            Click any thumbnail to open the lightbox. Use arrow keys or navigation buttons to browse.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {images.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => openAt(index)}
                className="group relative overflow-hidden rounded-lg border border-zinc-200 transition-all hover:shadow-md dark:border-[#2D3640]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                  <svg
                    className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Open with Button
          </p>
          <button
            type="button"
            onClick={() => openAt(0)}
            className="rounded-lg bg-[#4CCBBF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3db3a8]"
          >
            Open Lightbox
          </button>
        </div>
      </div>

      <Lightbox
        images={images}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialIndex={initialIndex}
      />
    </SectionWrapper>
  );
}
