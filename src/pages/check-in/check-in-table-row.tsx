import { Box, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { CheckInDetails } from './check-in-details'

export function CheckInTableRow() {
  return (
    <TableRow className="text-center">
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <CheckInDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        821e78f7asdhdf128h
      </TableCell>
      <TableCell className="text-muted-foreground">há 15 minutos</TableCell>
      <TableCell className="text-muted-foreground">23lb</TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">#3921</TableCell>
      <TableCell className="font-medium">Pedro Requião</TableCell>
      <TableCell>
        <Button variant="ghost" size="xs" className="text-amber-600">
          <Box className="mr-2 h-3 w-3" />
          837-2639
        </Button>
      </TableCell>
    </TableRow>
  )
}
