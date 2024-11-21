import { AlertTriangle, CheckCheck, CheckCircle, Plane } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { filterCheckInsApi } from '@/api/filter-check-ins'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { CheckInTableFilters } from './check-in-table-filters'
import { CheckInTableRow } from './check-in-table-row'
import { CheckInsLoadingSkeleton } from './check-ins-loading-skeleton'
import { CheckInsMetricsCard } from './check-ins-metrics-card'

export interface CheckInPreviewDataInterface {
  checkInId: string
  hubId: string
  customerFirstName: string
  customerLastName: string
  status: string
  packageId?: string
  weight: number
  createdAt: string
}

export interface CheckInsFilterDataInterface {
  status?: number
  hubId?: number
  customerName?: string
  page?: number
}

export function CheckInsList() {
  const [checkInsFilterData, setCheckInsFilterData] =
    useState<CheckInsFilterDataInterface>({
      ...{ page: 1 },
    })
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [metaData, setMetaData] = useState({
    pageIndex: 0,
    perPage: 8,
    totalCount: 0,
  })
  const [checkIns, setCheckIns] = useState<CheckInPreviewDataInterface[]>([])
  const windowWidth = window.innerWidth
  const colSpanClass = windowWidth > 1024 ? 'col-span-10' : 'col-span-12'

  useEffect(() => {
    handleFilterCheckIns(checkInsFilterData)
  }, [checkInsFilterData])

  async function handleFilterCheckIns(data: CheckInsFilterDataInterface) {
    setCheckInsFilterData(data)
    const checkInsPreview = await filterCheckInsApi(data)
    setCheckIns(checkInsPreview.checkIns)
    setMetaData({
      pageIndex: checkInsPreview.meta.pageIndex,
      perPage: checkInsPreview.meta.perPage,
      totalCount: checkInsPreview.meta.totalCount,
    })
    setIsLoading(false)
  }

  async function handlePaginate(pageIndex: number) {
    setIsLoading(true)
    setCheckIns([])
    setCurrentPage(pageIndex)
    setCheckInsFilterData({ ...checkInsFilterData, page: pageIndex })
  }

  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Check-ins</h1>
        <div className="grid grid-cols-12 gap-4">
          <div className={colSpanClass}>
            <div className="space-y-2.5">
              <CheckInTableFilters onData={handleFilterCheckIns} />

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[5rem] text-center"></TableHead>
                      <TableHead className="w-[6rem] text-center">
                        Código
                      </TableHead>
                      <TableHead className="w-[15rem] text-center">
                        Data de Recebimento
                      </TableHead>
                      <TableHead className="w-[5rem] text-center">
                        Peso
                      </TableHead>
                      <TableHead className="w-[10rem] text-center">
                        Status
                      </TableHead>
                      <TableHead className="w-[5rem] text-center">
                        Hub ID
                      </TableHead>
                      <TableHead className="w-[15rem] text-center">
                        Cliente
                      </TableHead>
                      <TableHead className="w-[10rem] text-center">
                        Box ID
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <CheckInsLoadingSkeleton
                        perPage={metaData.perPage}
                        totalCount={metaData.totalCount}
                        currentPage={currentPage}
                      />
                    ) : checkIns.length === 0 ? (
                      <TableRow className="">
                        <td colSpan={8} className="p-8 text-center">
                          Nenhum check-in encontrado
                        </td>
                      </TableRow>
                    ) : (
                      checkIns.map((checkIn, i) => (
                        <CheckInTableRow
                          key={i}
                          checkInId={checkIn.checkInId}
                          hubId={checkIn.hubId}
                          customerFirstName={checkIn.customerFirstName}
                          customerLastName={checkIn.customerLastName}
                          status={checkIn.status}
                          packageId={checkIn.packageId}
                          weight={checkIn.weight}
                          createdAt={checkIn.createdAt}
                        />
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {isLoading ? null : (
                <Pagination
                  pageIndex={metaData.pageIndex}
                  totalCount={metaData.totalCount}
                  perPage={metaData.perPage}
                  onPageChange={handlePaginate}
                />
              )}
            </div>
          </div>

          {windowWidth > 1024 && (
            <div className="col-span-2 mt-10 flex flex-col gap-3">
              <CheckInsMetricsCard
                title="Recebidos"
                value={1928}
                description="Consultar todos os pedidos recebidos"
                icon={CheckCircle}
              />
              <CheckInsMetricsCard
                title="Pendententes"
                value={1928}
                description="Consultar todos os pedidos recebidos"
                icon={AlertTriangle}
              />
              <CheckInsMetricsCard
                title="Enviados"
                value={1928}
                description="Consultar todos os pedidos recebidos"
                icon={Plane}
              />
              <CheckInsMetricsCard
                title="Retirados"
                value={1928}
                description="Consultar todos os pedidos recebidos"
                icon={CheckCheck}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
