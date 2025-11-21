"use client";
import { useState } from "react";

export default function Topbar() {
  const [query, setQuery] = useState("");
  return (
    <header className="h-16 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4">
      <div className="flex items-center gap-2 lg:hidden">
        <span className="text-lg font-semibold">SpendRule</span>
      </div>
      <div className="flex-1 flex items-center gap-3 max-w-2xl">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search contracts, invoices, vendors"
          className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-md px-3 py-2 text-sm bg-zinc-100 dark:bg-zinc-800">Notifications</button>
        <button className="rounded-full h-8 w-8 bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </header>
  );
}