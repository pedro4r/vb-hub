import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'

interface CheckInCustomersSearchSkeletonProps {
  perPage: number
  totalCount: number
  currentPage: number
}

export function CheckInCustomersSearchSkeleton(
  params: CheckInCustomersSearchSkeletonProps,
) {
  const { perPage, totalCount, currentPage } = params
  const totalFullPages = Math.floor(totalCount / perPage)
  const customersCount =
    currentPage <= totalFullPages ? perPage : totalCount % perPage

  return (
    <TableBody>
      {Array.from({ length: customersCount }, (_, index) => (
        <TableRow key={index} className="hover:bg-transparent">
          <TableCell className="w-[5rem] text-center">
            <Skeleton className="h-[2.6rem]" />
          </TableCell>
          <TableCell className="w-[15rem] text-center">
            <Skeleton className="h-[2.6rem]" />
          </TableCell>
          <TableCell className="w-[5rem] text-center">
            <Skeleton className="h-[2.6rem]" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
