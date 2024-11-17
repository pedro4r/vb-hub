import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { CheckInsFilterDataInterface } from '.'

interface CheckInTableFiltersProps {
  onData: (data: CheckInsFilterDataInterface) => void
}

const filterCheckInSchema = z.object({
  status: z.number().optional(),
  hubId: z.string().optional(),
  customerName: z.string().optional(),
})

type FilterCheckInFormData = z.infer<typeof filterCheckInSchema>

export function CheckInTableFilters({ onData }: CheckInTableFiltersProps) {
  const [hubId, setHubId] = useState<string>('')
  const [customerName, setCustomerName] = useState<string>('')
  const [status, setStatus] = useState<number>(0)

  const { register, handleSubmit, setValue, reset } =
    useForm<FilterCheckInFormData>({
      resolver: zodResolver(filterCheckInSchema),
      defaultValues: {
        hubId,
        customerName,
        status,
      },
    })

  function handleFilterCheckInData(data: FilterCheckInFormData) {
    const hubIdInt =
      data.hubId && data.hubId.length > 0 ? parseInt(data.hubId, 10) : undefined

    const adaptedData: CheckInsFilterDataInterface = {
      status: status === 0 ? undefined : status,
      hubId: hubIdInt || undefined,
      customerName: data.customerName || undefined,
    }
    onData(adaptedData as CheckInsFilterDataInterface)
  }

  function handleResetFilters() {
    reset({
      hubId: '',
      customerName: '',
      status: 0,
    })
    setHubId('')
    setCustomerName('')
    setStatus(0)
  }

  return (
    <form
      className="flex flex-wrap items-center gap-2"
      onSubmit={handleSubmit(handleFilterCheckInData)}
    >
      <Input
        placeholder="Hub ID"
        className="h-8 max-w-[4.5rem]"
        {...register('hubId')}
        value={hubId}
        onChange={(e) => {
          const value = e.target.value
          setHubId(value)
          setValue('hubId', value)
        }}
        disabled={customerName.length > 0}
      />

      <Input
        placeholder="Nome do cliente"
        className="h-8 max-w-36"
        {...register('customerName')}
        value={customerName}
        onChange={(e) => {
          const value = e.target.value
          setCustomerName(value)
          setValue('customerName', value)
        }}
        disabled={hubId.length > 0}
      />

      <Select
        value={status.toString()}
        onValueChange={(value) => {
          const numericValue = parseInt(value, 10)
          setStatus(numericValue)
          setValue('status', numericValue)
        }}
      >
        <SelectTrigger className="h-8 max-w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Todos status</SelectItem>
          <SelectItem value="1">Recebido</SelectItem>
          <SelectItem value="2">Pendente</SelectItem>
          <SelectItem value="3">Enviado</SelectItem>
          <SelectItem value="4">Entregue</SelectItem>
          <SelectItem value="5">Retirado</SelectItem>
          <SelectItem value="6">Abandonado</SelectItem>
          <SelectItem value="7">Retornado</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="secondary" size="xs" type="submit">
        <Search className="mr-2 h-4 max-w-48" />
        Filtrar resultados
      </Button>

      <Button
        variant="outline"
        size="xs"
        type="button"
        onClick={handleResetFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
