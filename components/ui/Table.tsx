import { ReactNode } from "react";

export function Table({ columns, rows }: { columns: { key: string; label: string }[]; rows: Record<string, ReactNode>[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left">
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 font-medium">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
                  {r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}