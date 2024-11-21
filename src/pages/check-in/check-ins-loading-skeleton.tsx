import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

interface CheckInsLoadingSkeletonProps {
  perPage: number
  totalCount: number
  currentPage: number
}

export function CheckInsLoadingSkeleton(params: CheckInsLoadingSkeletonProps) {
  const { perPage, totalCount, currentPage } = params
  const totalFullPages = Math.floor(totalCount / perPage)
  const customersCount =
    currentPage <= totalFullPages ? perPage : totalCount % perPage

  return (
    <>
      {Array.from({ length: customersCount }, (_, index) => (
        <TableRow key={index} className="text-center hover:bg-transparent">
          <TableCell className="w-[5rem] text-center">
            <Skeleton className="h-[2.2rem]" />
          </TableCell>
          <TableCell className="w-[6rem] text-center">
            <Skeleton className="h-[2.2rem]" />
          </TableCell>
          <TableCell className="w-[15rem] text-center">
            <Skeleton className="h-[2.2rem]" />
          </TableCell>
          <TableCell className="w-[5rem] text-center">
            <Skeleton className="h-[2.2rem]" />
          </TableCell>
          <TableCell className="w-[10rem] text-center">
            <Skeleton className="h-[2.2rem]" />
          </TableCell>
          <TableCell className="w-[5rem] text-center">
            <Skeleton className="h-[2.2rem]" />
          </TableCell>
          <TableCell className="w-[15rem] text-center">
            <Skeleton className="h-[2.2rem]" />
          </TableCell>
          <TableCell className="w-[10rem] text-center">
            <Skeleton className="h-[2.2rem]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
