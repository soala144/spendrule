export default function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 border border-dashed rounded-lg border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <div className="text-lg font-medium">{title}</div>
      {description && <div className="text-sm text-zinc-500 mt-1">{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}