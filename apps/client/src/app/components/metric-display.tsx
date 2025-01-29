interface MetricDisplayProps {
  label: string
  value: string | number
  subValue?: string | number
  className?: string
}

export function MetricDisplay({ label, value, subValue, className }: MetricDisplayProps) {
  return (
    <div className={className}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
      {subValue && <div className="text-xs text-muted-foreground">{subValue}</div>}
    </div>
  )
}

