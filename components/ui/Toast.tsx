"use client";
import { useState, useCallback } from "react";

export function useToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const add = useCallback((message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2500);
  }, []);
  const Toasts = (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((t) => (
        <div key={t.id} className="rounded-md bg-zinc-900 text-zinc-50 px-3 py-2 text-sm shadow">
          {t.message}
        </div>
      ))}
    </div>
  );
  return { add, Toasts };
}