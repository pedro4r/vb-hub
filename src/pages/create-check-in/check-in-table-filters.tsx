import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Search } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { CustomerDataInterface } from './create-check-in'

interface CheckInTableFiltersProps {
  onData: (data: CustomerDataInterface) => void
}

const searchCustomerSchema = z
  .object({
    hubId: z.string().optional(),
    name: z.string().optional(),
  })
  .refine((data) => data.hubId || data.name, {
    message: 'At least one of hubId or name must be provided',
  })
type SearchCustomerSchema = z.infer<typeof searchCustomerSchema>

export function CheckInTableFilters({ onData }: CheckInTableFiltersProps) {
  const fakeData = [
    {
      name: 'Pedro Requião',
      hubId: '124',
    },
    {
      name: 'Tayane Sampaio Requiao',
      hubId: '3849',
    },
    {
      name: 'Tania Sampaio',
      hubId: '4321',
    },
    {
      name: 'Heloisa Requiao',
      hubId: '5632',
    },
  ]

  const [customersFound, setCustomersFound] = useState<SearchCustomerSchema[]>(
    [],
  )

  const [openDialog, setOpenDialog] = useState(false)

  function selectCustomer(data: SearchCustomerSchema) {
    if (data && data.name && data.hubId) {
      onData(data as CustomerDataInterface)
    }

    setOpenDialog(!openDialog)
  }

  function searchCustomer({ hubId, name }: SearchCustomerSchema) {
    setOpenDialog(true)
    if (hubId) {
      const apiResponse = fakeData.filter((data) => data.hubId === hubId)
      setCustomersFound(apiResponse)
    } else if (name) {
      const apiResponse = fakeData.filter((data) =>
        data.name.toLowerCase().includes(name.toLowerCase()),
      )
      setCustomersFound(apiResponse)
    }
  }

  const { register, handleSubmit } = useForm<SearchCustomerSchema>({
    resolver: zodResolver(searchCustomerSchema),
  })

  return (
    <>
      <form
        className="flex items-center gap-2"
        onSubmit={handleSubmit(searchCustomer)}
      >
        <Input
          placeholder="Hub ID"
          className="h-[40px] w-[70px]"
          {...register('hubId')}
        />
        <Input
          placeholder="Nome do cliente"
          className="h-[40px]"
          {...register('name')}
        />
        <Button
          className="h-[40px]"
          variant="secondary"
          size="xs"
          type="submit"
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </form>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader></DialogHeader>
          <div className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-center">Hub ID</TableHead>
                  <TableHead className="text-center">Nome</TableHead>
                  <TableHead className="text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customersFound.map((data) => (
                  <TableRow key={data.hubId} className="hover:bg-transparent">
                    <TableCell className="text-center">{data.hubId}</TableCell>
                    <TableCell className="text-center">{data.name}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        className="h-[30px] w-[50px]"
                        onClick={() => selectCustomer(data)}
                      >
                        <Check />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
