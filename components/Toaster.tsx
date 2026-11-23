"use client";
import { create } from "zustand";
import { useEffect } from "react";

type Toast = { id: string; message: string; type: "success" | "error" };
type ToastState = { toasts: Toast[]; add: (t: Omit<Toast, "id">) => void; remove: (id: string) => void };

const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  add: ({ message, type }) => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3000);
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export function toast(message: string, type: "success" | "error" = "success") {
  useToastStore.getState().add({ message, type });
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2 rounded-lg text-sm shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200 ${
            t.type === "error" ? "bg-red-600 text-white" : "bg-charcoal text-white"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
