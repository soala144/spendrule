export function Input({ value, onChange, placeholder, type = "text" }: { value?: string | number; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; type?: string }) {
  return (
    <input
      value={typeof value === "number" ? String(value) : value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none"
    />
  );
}

export function Select({ value, onChange, children }: { value?: string; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none"
    >
      {children}
    </select>
  );
}