import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20",
      outline: "border border-white/10 bg-transparent hover:bg-white/5 text-slate-300",
      ghost: "hover:bg-white/5 text-slate-400 hover:text-white",
    };
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-8 text-lg",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-bold tracking-wide transition-all active:scale-95 disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
