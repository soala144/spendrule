"use client";
import { ReactNode, useEffect } from "react";

export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: ReactNode }) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        {(title || true) && (
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-2">
            <div className="text-sm font-medium">{title}</div>
            <button onClick={onClose} className="text-sm">Close</button>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}