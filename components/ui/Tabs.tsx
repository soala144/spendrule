"use client";
import { useState } from "react";

export function Tabs({ tabs }: { tabs: { key: string; label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
  return (
    <div>
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 py-2 text-sm -mb-px border-b-2 transition ${
              active === t.key
                ? "border-zinc-900 dark:border-zinc-100"
                : "border-transparent text-zinc-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {tabs.find((t) => t.key === active)?.content}
      </div>
    </div>
  );
}