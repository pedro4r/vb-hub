import { Box, CheckCircle, FileBox, Scan, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function HubMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex select-none items-center gap-2">
          <Box className="h-6 w-6" />
          <span>Hub</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="mt-2 w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-xs font-normal text-muted-foreground">
            Check-Ins
          </span>
        </DropdownMenuLabel>

        <DropdownMenuItem>
          <Link to="/check-in/create" className="flex flex-row">
            <CheckCircle className="mr-2 h-4 w-4" />
            Criar Check-In
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link to="/check-in" className="flex flex-row">
            <Scan className="mr-2 h-4 w-4" />
            Buscar Check-In
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="flex flex-col">
          <span className="text-xs font-normal text-muted-foreground">
            Envios
          </span>
        </DropdownMenuLabel>

        <DropdownMenuItem>
          <FileBox className="mr-2 h-4 w-4" />
          <span>Ver Solicitações</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Box className="mr-2 h-4 w-4" />
          <span>Adminstrar Envios</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="flex flex-col">
          <span className="text-xs font-normal text-muted-foreground">
            Clientes
          </span>
        </DropdownMenuLabel>

        <DropdownMenuItem>
          <UserRound className="mr-2 h-4 w-4" />
          <span>Buscar Cliente</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
