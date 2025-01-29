"use client"

import { cn } from "@erisfy/shadcnui"



interface TrailIndicatorProps {
  currentValue: number
  previousValue: number
  max: number
  min: number
  color?: string
  className?: string
  label?: string
  value?: string
}

export function TrailIndicator({
  currentValue,
  previousValue,
  max,
  min,
  color = "bg-sky-400",
  className,
  label,
  value,
}: TrailIndicatorProps) {
  // Normalize values between 0 and 100
  const normalize = (value: number) => {
    return ((value - min) / (max - min)) * 100
  }

  const currentPosition = normalize(currentValue)
  const previousPosition = normalize(previousValue)

  const height = Math.abs(currentPosition - previousPosition)
  const top = Math.min(currentPosition, previousPosition)

  return (
    <div className="flex flex-col items-center gap-2">
      {label && <div className="text-xs text-muted-foreground whitespace-nowrap">{label}</div>}
      <div className={cn("relative h-24 w-2", className)}>
        {/* Trail */}
        <div
          className={cn("absolute w-0.5 left-1/2 -translate-x-1/2", color)}
          style={{
            height: `${height}%`,
            top: `${top}%`,
          }}
        />
        {/* Current value indicator */}
        <div
          className="absolute w-2 h-2 rounded-full bg-black left-1/2 -translate-x-1/2"
          style={{
            top: `${currentPosition}%`,
          }}
        />
      </div>
      {value && <div className="text-xs font-medium text-center whitespace-nowrap">{value}</div>}
    </div>
  )
}

