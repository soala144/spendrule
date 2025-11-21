"use client";
import { ReactNode } from "react";

export default function Drawer({ open, onClose, title, children, side = "right" }: { open: boolean; onClose: () => void; title?: string; children: ReactNode; side?: "left" | "right" }) {
  if (!open) return null;
  const sideClass = side === "right" ? "right-0" : "left-0";
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`absolute top-0 ${sideClass} h-full w-[420px] bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800`}>        
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-2">
          <div className="text-sm font-medium">{title}</div>
          <button onClick={onClose} className="text-sm">Close</button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-48px)]">{children}</div>
      </div>
    </div>
  );
}