import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function CheckInTableFilters() {
  return (
    <form className="flex flex-wrap items-center gap-2">
      <Input placeholder="Hub ID" className="h-8 max-w-[4.5rem]" />
      <Input placeholder="Nome do cliente" className="h-8 max-w-36" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 max-w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="pending">Recebido</SelectItem>
          <SelectItem value="canceled">Pendente</SelectItem>
          <SelectItem value="processing">Enviado</SelectItem>
          <SelectItem value="delivered">Retirado</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="secondary" size="xs" type="submit">
        <Search className="mr-2 h-4 max-w-48" />
        Filtrar resultados
      </Button>
      <Button variant="outline" size="xs" type="button">
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
