import * as React from "react"
import { cn } from "@/lib/utils"

const badgeVariants = {
  default:
    "border-transparent bg-aura-primary text-white hover:bg-aura-primary/80",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "text-foreground border-border",
  glow: "border-aura-primary/20 bg-aura-primary/10 text-aura-primary shadow-[0_0_15px_rgba(139,92,246,0.15)]",
}

function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
