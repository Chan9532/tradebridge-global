import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" | "ghost"; size?: "sm" | "md" | "lg" };

export function Button({ className, variant = "primary", size = "md", ...props }: Props) {
  const variants = { primary: "bg-blue-700 text-white hover:bg-blue-800 shadow-sm", secondary: "bg-amber-400 text-slate-950 hover:bg-amber-300", outline: "border border-slate-300 bg-white text-slate-800 hover:border-blue-600 hover:text-blue-700", ghost: "text-slate-700 hover:bg-slate-100" };
  const sizes = { sm: "h-9 px-4 text-sm", md: "h-11 px-5 text-sm", lg: "h-12 px-6 text-[15px]" };
  return <button className={cn("inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)} {...props} />;
}
