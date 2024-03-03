import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { CheckInCarrousel } from './check-in-carrousel'

export function CheckInDetails() {
  return (
    <DialogContent className="flex flex-col">
      <DialogHeader>
        <DialogTitle>Check-in: 1827fy2827d6h</DialogTitle>
        <DialogDescription>Hud ID: #9384</DialogDescription>
      </DialogHeader>

      <div className="object-fit self-center">
        <CheckInCarrousel />
      </div>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Data de Recebimento
              </TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium">12/12/2021</span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">Pedro Requião</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Peso</TableCell>
              <TableCell className="flex justify-end">23lb</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
