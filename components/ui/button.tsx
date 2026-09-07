import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize };

export function buttonStyles({ variant = "primary", size = "md", className }: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  const variants = { primary: "bg-blue-700 text-white shadow-sm shadow-blue-900/10 hover:bg-blue-600", secondary: "bg-amber-400 text-slate-950 shadow-sm shadow-amber-900/10 hover:bg-amber-300", outline: "border border-slate-300 bg-white text-slate-800 hover:border-blue-600 hover:text-blue-700", ghost: "text-slate-700 hover:bg-slate-100" };
  const sizes = { sm: "h-9 px-4 text-sm", md: "h-11 px-5 text-sm", lg: "h-12 px-6 text-[15px]" };

  return cn("inline-flex items-center justify-center gap-2 rounded-xl font-display font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className);
}

export function Button({ className, variant = "primary", size = "md", ...props }: Props) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />;
}
