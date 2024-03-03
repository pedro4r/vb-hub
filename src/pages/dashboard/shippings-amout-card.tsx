import { Box } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function ShippingsAmoutCard() {
  const monthRevenue = true
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Total de envios
        </CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue ? (
          <>
            <span className="text-2xl font-bold tracking-tight">1231</span>
            <p className="text-xs text-muted-foreground">
              <>
                <span className="text-emerald-500 dark:text-emerald-400">
                  132
                </span>{' '}
                envios feitos em 30 dias
              </>
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
