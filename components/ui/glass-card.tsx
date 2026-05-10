import type { HTMLAttributes, ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={`glass rounded-[8px] ${className}`} {...props}>
      {children}
    </div>
  );
}
