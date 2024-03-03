import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

export function CheckInTableRow() {
  return (
    <TableRow className="text-md text-center">
      <TableCell className="font-mono">#2834</TableCell>
      <TableCell className="text-muted-foreground">Pedro Requião</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Plus className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
