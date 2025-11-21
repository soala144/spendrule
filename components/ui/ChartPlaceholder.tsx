export default function ChartPlaceholder({ title }: { title?: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
      {title && <div className="text-sm font-medium mb-2">{title}</div>}
      <div className="h-40 w-full bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded" />
    </div>
  );
}