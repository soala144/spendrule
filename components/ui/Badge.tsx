export default function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "error" }) {
  const styles = {
    default: "bg-zinc-200 text-zinc-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  }[variant];
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${styles}`}>{children}</span>;
}