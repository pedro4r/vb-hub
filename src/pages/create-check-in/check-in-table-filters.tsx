import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  fetchCustomersByName,
  FetchCustomersByNameParams,
} from '@/api/fetch-customers-by-name'
import {
  getCustomerByHubId,
  GetCustomerByHubIdParams,
} from '@/api/get-customer-by-hub-id'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
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
import { CheckInCustomerSearchPagination } from './check-in-customer-search-pagination'
import { CheckInCustomersSearchSkeleton } from './check-in-customers-search-skeleton'

interface CheckInTableFiltersProps {
  onData: (data: CustomerPreviewDataInterface) => void
}

const searchCustomerSchema = z
  .object({
    hubId: z
      .string()
      .optional()
      .transform((value) => Number(value)),
    name: z.string().optional(),
  })
  .refine((data) => data.hubId || data.name, {
    message: 'At least one of hubId or name must be provided',
  })
type SearchCustomerSchema = z.infer<typeof searchCustomerSchema>

export function CheckInTableFilters({ onData }: CheckInTableFiltersProps) {
  const [loading, setLoading] = useState(false)
  const [customersFound, setCustomersFound] = useState<
    CustomerPreviewDataInterface[]
  >([])
  const [errorMessage, setErrorMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [metaData, setMetaData] = useState({
    pageIndex: 1,
    perPage: 5,
    totalCount: 1,
  })

  const [openDialog, setOpenDialog] = useState(false)

  function selectCustomer(data: CustomerPreviewDataInterface) {
    // Check if the data has the required fields
    if (data && data.firstName && data.lastName && data.hubId) {
      onData(data as CustomerPreviewDataInterface)
    }

    setOpenDialog(!openDialog)
  }

  async function searchCustomer(data: SearchCustomerSchema) {
    setOpenDialog(true)
    setCurrentPage(1)

    if (data.hubId) {
      const params: GetCustomerByHubIdParams = {
        hubId: data.hubId,
      }

      setMetaData({
        pageIndex: 1,
        perPage: 5,
        totalCount: 1,
      })

      try {
        setLoading(true)
        const customer = await getCustomerByHubId(params)
        setOpenDialog(true)
        setCustomersFound([customer])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching customer:', error)
        setErrorMessage('Cliente não encontrado')
        setLoading(false)
      }
    } else if (data && data.name) {
      const params: FetchCustomersByNameParams = {
        name: data.name,
        page: currentPage,
      }

      try {
        setLoading(true)
        const { customers, meta } = await fetchCustomersByName(params)
        setMetaData(meta)
        setOpenDialog(true)
        setCustomersFound(customers)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching customer:', error)
        setErrorMessage('Cliente não encontrado')
        setLoading(false)
      }
    }
  }

  const { register, handleSubmit, getValues, watch } =
    useForm<SearchCustomerSchema>({
      resolver: zodResolver(searchCustomerSchema),
    })

  async function handlePaginate(pageIndex: number) {
    setLoading(true)
    setCustomersFound([])
    setCurrentPage(pageIndex)
    const data = getValues()

    if (data.name) {
      const params: FetchCustomersByNameParams = {
        name: data.name,
        page: pageIndex,
      }

      try {
        const { customers } = await fetchCustomersByName(params)
        setCustomersFound(customers)
      } catch (error) {
        console.error('Error fetching customers:', error)
        setErrorMessage('Erro ao buscar clientes')
      }
    }
    setLoading(false)
  }

  const hubId = watch('hubId')
  const name = watch('name')

  useEffect(() => {
    if (!openDialog) {
      setCustomersFound([])
    }
  }, [openDialog])

  return (
    <>
      <form
        className="flex items-center gap-2"
        onSubmit={handleSubmit(searchCustomer)}
      >
        <Input
          disabled={!!name}
          type="string"
          placeholder="Hub ID"
          className="h-[40px] w-[70px] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          onKeyDown={(event) => {
            if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
              event.preventDefault()
            }
          }}
          inputMode="numeric"
          {...register('hubId')}
        />
        <Input
          disabled={!!hubId}
          placeholder="Nome do cliente"
          className="h-[40px]"
          {...register('name')}
        />
        <Button
          disabled={!(hubId || name)}
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
          <div className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-center">Hub ID</TableHead>
                  <TableHead className="text-center">Nome</TableHead>
                  <TableHead className="text-center"></TableHead>
                </TableRow>
              </TableHeader>
              {loading ? (
                <CheckInCustomersSearchSkeleton
                  perPage={metaData.perPage}
                  totalCount={metaData.totalCount}
                  currentPage={currentPage}
                />
              ) : customersFound.length > 0 ? (
                <TableBody>
                  {customersFound.map((data) => (
                    <TableRow
                      key={data.customerId}
                      className="hover:bg-transparent"
                    >
                      <TableCell className="w-[5rem] text-center">
                        {`#${data.hubId}`}
                      </TableCell>
                      <TableCell className="w-[15rem] text-center">
                        {data.firstName} {data.lastName}
                      </TableCell>
                      <TableCell className="w-[5rem] text-center">
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
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      <p className=" text-red-500">{errorMessage}</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </div>
          {customersFound.length > 0 ? (
            <CheckInCustomerSearchPagination
              onPageChange={handlePaginate}
              pageIndex={currentPage}
              totalCount={metaData.totalCount}
              perPage={metaData.perPage}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
