import { ReactNode } from "react";

export default function Card({ title, action, children }: { title?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-2">
          <div className="text-sm font-medium">{title}</div>
          {action}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}