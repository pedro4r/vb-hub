import { AlertTriangle, CheckCheck, CheckCircle, Plane } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { fetchRecentCheckIns } from '@/api/fetch-recent-check-ins'
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

export function CheckInsList() {
  const [checkIns, setCheckIns] = useState<CheckInPreviewDataInterface[]>([])
  const windowWidth = window.innerWidth
  const colSpanClass = windowWidth > 1024 ? 'col-span-10' : 'col-span-12'

  async function handleFetchRecentCheckIns() {
    const checkInsPreview = await fetchRecentCheckIns({ page: 1 })
    setCheckIns(checkInsPreview)
  }

  useEffect(() => {
    handleFetchRecentCheckIns()
  }, [])

  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Check-ins</h1>
        <div className="grid grid-cols-12 gap-4">
          <div className={colSpanClass}>
            <div className="space-y-2.5">
              <CheckInTableFilters />

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[64px]"></TableHead>
                      <TableHead className=" text-center">Código</TableHead>
                      <TableHead className="text-center">
                        Data de Recebimento
                      </TableHead>
                      <TableHead className="text-center">Peso</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Hub ID</TableHead>
                      <TableHead className="text-center">Cliente</TableHead>
                      <TableHead className="w-[164px] text-center">
                        Box ID
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {checkIns.map((checkIn, i) => (
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
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Pagination pageIndex={0} totalCount={105} perPage={10} />
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
