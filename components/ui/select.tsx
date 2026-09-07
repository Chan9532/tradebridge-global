import * as React from "react";
import { cn } from "@/lib/utils";
export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) { return <select className={cn("h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100", className)} {...props}>{children}</select>; }
