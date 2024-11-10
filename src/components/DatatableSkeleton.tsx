import { Skeleton } from '@/components/ui/skeleton'

const DatatableSkeleton = ({ rowCount = 10 }: { rowCount?: number }) => {
  return (
    <div className="mt-3 w-full space-y-3">
      {/* Header Skeleton */}
      <SkeletonRow />

      {/* Rows Skeleton */}
      {[...Array(rowCount)].map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  )
}

const SkeletonRow = ({ key }: { key?: number }) => {
  return (
    <div key={key} className="flex w-full space-x-4">
      <Skeleton className="h-6 flex-grow" />
      <Skeleton className="h-6 flex-grow" />
      <Skeleton className="h-6 flex-grow" />
      <Skeleton className="h-6 flex-grow" />
    </div>
  )
}

export default DatatableSkeleton
