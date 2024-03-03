import { Box } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function NotificationTable() {
  return (
    <Table className="mt-6">
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Link to="/" className="w-full">
                <Box />
              </Link>
            </TableCell>
            <TableCell>
              <Link to="/" className="w-full">
                #2032
              </Link>
            </TableCell>
            <TableCell>
              <Link to="/" className="w-full">
                Pedido de envio
              </Link>
            </TableCell>
            <TableCell className="text-slate-500">
              <Link to="/" className="w-full">
                3h atrás
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
