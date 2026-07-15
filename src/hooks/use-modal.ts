"use client";

import { useCallback, useState } from "react";

export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Manages open/close state for dialogs, drawers, and any overlay UI.
 *
 * @example
 * const { isOpen, open, close } = useModal();
 *
 * return (
 *   <>
 *     <button onClick={open}>Open</button>
 *     {isOpen && <Modal onClose={close} />}
 *   </>
 * );
 */
export function useModal(initialOpen = false): UseModalReturn {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}
