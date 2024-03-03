import { LucideIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from '../dashboard/metric-card-skeleton'

interface CheckInsMetricsCardProps {
  title: string
  value: number
  description: string
  icon: LucideIcon
}

export function CheckInsMetricsCard({
  title,
  value,
  description,
  icon: Icon,
}: CheckInsMetricsCardProps) {
  const monthRevenue = true
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <Icon />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue ? (
          <>
            <span className="text-2xl font-bold tracking-tight">{value}</span>
            <p className="text-xs text-muted-foreground">{description}</p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
