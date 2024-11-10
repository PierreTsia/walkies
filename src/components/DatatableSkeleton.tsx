import { Skeleton } from '@/components/ui/skeleton'

const DatatableSkeleton = ({ rowCount = 10 }: { rowCount?: number }) => {
  return (
    <div className="mt-3 w-full space-y-3">
      {/* Header Skeleton */}
      <SkeletonRow />

      {/* Rows Skeleton */}
      {[...Array(rowCount)].map((_, i) => (
        // eslint-disable-next-line react/jsx-key
        <SkeletonRow key={`${i}--row`} />
      ))}
    </div>
  )
}

const SkeletonRow = () => {
  return (
    <div className="flex w-full space-x-4">
      <Skeleton className="h-6 flex-grow" />
      <Skeleton className="h-6 flex-grow" />
      <Skeleton className="h-6 flex-grow" />
      <Skeleton className="h-6 flex-grow" />
    </div>
  )
}

export default DatatableSkeleton
