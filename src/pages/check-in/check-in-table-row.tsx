import { formatDistance } from 'date-fns'
import { Box, Search } from 'lucide-react'
import { useState } from 'react'

import { getCheckIn } from '@/api/get-check-in'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { CheckInDetails } from './check-in-details'

interface CheckInTableRowProps {
  checkInId: string
  hubId: string
  customerFirstName: string
  customerLastName: string
  status: string
  packageId?: string
  weight: number
  createdAt: string
}

export interface CheckInDetailsProps {
  checkInId: string
  customerId: string
  hubId: number
  customerFirstName: string
  customerLastName: string
  packageId?: string
  details: string
  status: string
  attachments: string[]
  weight: number
  createdAt: string
  updatedAt: string
}

export function CheckInTableRow({
  checkInId,
  hubId,
  customerFirstName,
  customerLastName,
  packageId,
  status,
  weight,
  createdAt,
}: CheckInTableRowProps) {
  const date = new Date(createdAt)
  const dateDistance = formatDistance(date, new Date(), {
    addSuffix: true,
    includeSeconds: true,
  })
  const [checkIn, setCheckIn] = useState<CheckInDetailsProps | null>(null)

  async function handleFetchRecentCheckIns() {
    const checkInPreview = await getCheckIn({ checkInId })
    setCheckIn({
      ...checkInPreview,
    })
  }

  return (
    <TableRow className="text-center">
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleFetchRecentCheckIns()}
            >
              <Search className="h-3 w-3" />
            </Button>
          </DialogTrigger>

          {checkIn ? (
            <CheckInDetails
              checkInId={checkInId}
              customerId={checkIn.customerId}
              hubId={checkIn.hubId}
              customerFirstName={checkIn.customerFirstName}
              customerLastName={checkIn.customerLastName}
              packageId={checkIn.packageId}
              details={checkIn.details}
              status={checkIn.status}
              attachments={checkIn.attachments}
              weight={checkIn.weight}
              createdAt={checkIn.createdAt}
              updatedAt={checkIn.updatedAt}
            />
          ) : (
            ''
          )}
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {checkInId.slice(0, 8)}
      </TableCell>
      <TableCell className="text-muted-foreground">{dateDistance}</TableCell>
      <TableCell className="text-muted-foreground">
        {weight ? `${Math.round(weight / 453.59237)} lb` : '--'}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">
            {status.toLowerCase()}
          </span>
        </div>
      </TableCell>
      <TableCell className="font-medium">#{hubId}</TableCell>
      <TableCell className="font-medium">
        {customerFirstName} {customerLastName}
      </TableCell>
      <TableCell>
        {packageId ? (
          <Button variant="ghost" size="xs" className="text-amber-600">
            <Box className="mr-2 h-3 w-3" />
            {packageId}
          </Button>
        ) : (
          '--'
        )}
      </TableCell>
    </TableRow>
  )
}
