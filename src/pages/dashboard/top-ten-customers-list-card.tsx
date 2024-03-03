import { Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function TopTenCustomersListCard() {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Top 10 clientes
        </CardTitle>
        <Trophy className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <Table className="">
          <TableHeader>
            <TableRow className="text-center">
              <TableCell className="py-2">HubID</TableCell>
              <TableCell className="py-2">Nome</TableCell>
              <TableCell className="py-2">Envios</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index} className="text-center">
                <TableCell className="py-1">
                  <Link to="/" className="w-full">
                    #2032
                  </Link>
                </TableCell>
                <TableCell className="py-1">
                  <Link to="/" className="w-full">
                    Pedro Requião
                  </Link>
                </TableCell>
                <TableCell className="py-1 text-slate-500">
                  <Link to="/" className="w-full">
                    340
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
