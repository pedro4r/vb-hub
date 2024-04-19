import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Search } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  getCustomerByHubId,
  GetCustomerByHubIdParams,
} from '@/api/get-customer-by-hub-id'
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

import { CustomerPreviewDataInterface } from '.'

interface CheckInTableFiltersProps {
  onData: (data: CustomerPreviewDataInterface) => void
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
  const [customersFound, setCustomersFound] = useState<
    CustomerPreviewDataInterface[]
  >([])

  const [openDialog, setOpenDialog] = useState(false)

  function selectCustomer(data: CustomerPreviewDataInterface) {
    if (data && data.firstName && data.lastName && data.hubId) {
      onData(data as CustomerPreviewDataInterface)
    }

    setOpenDialog(!openDialog)
  }

  async function searchCustomer(data: SearchCustomerSchema) {
    if (data && data.hubId) {
      const params: GetCustomerByHubIdParams = {
        hubId: data.hubId,
      }

      const customer = await getCustomerByHubId(params)
      setOpenDialog(true)

      setCustomersFound([customer])
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
                  <TableRow
                    key={data.customerId}
                    className="hover:bg-transparent"
                  >
                    <TableCell className="text-center">
                      {`#${data.hubId}`}
                    </TableCell>
                    <TableCell className="text-center">
                      {data.firstName} {data.lastName}
                    </TableCell>
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
