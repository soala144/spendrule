"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/contracts", label: "Contracts" },
  { href: "/validation", label: "Validation" },
  { href: "/exceptions", label: "Exceptions" },
  { href: "/analytics", label: "Analytics" },
  { href: "/vendor", label: "Vendor Portal" },
  { href: "/ai-invoice", label: "AI Invoice Generator" },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="h-16 flex items-center px-4 text-xl font-semibold">SpendRule</div>
      <nav className="flex-1 px-2 py-2 space-y-1">
        {items.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-md px-3 py-2 text-sm transition ${
                active
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}