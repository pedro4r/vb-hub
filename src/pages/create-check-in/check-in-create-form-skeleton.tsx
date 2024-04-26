import { Skeleton } from '@/components/ui/skeleton'

interface CheckInCreateFormSkeletonProps {
  imageCount: number
}

export function CheckInCreateFormSkeleton({
  imageCount,
}: CheckInCreateFormSkeletonProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid h-20 grid-cols-10 gap-3">
        <Skeleton className="col-span-7 mt-1 h-20 w-full" />
        <Skeleton className="col-span-3 mt-1 h-20 w-full" />
      </div>
      <Skeleton className="h-20 w-full" />
      <div className="object-fit flex flex-wrap content-end items-start justify-center gap-2">
        {Array.from({ length: imageCount }, (_, index) => (
          <Skeleton key={index} className="h-[158px] w-[93px]" />
        ))}
      </div>
    </div>
  )
}
