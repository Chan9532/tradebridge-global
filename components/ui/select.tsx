import * as React from "react";
import { cn } from "@/lib/utils";
export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) { return <select className={cn("h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100", className)} {...props}>{children}</select>; }
