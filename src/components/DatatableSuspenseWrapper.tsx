'use client'
import { ReactNode, Suspense } from 'react'

import DatatableSkeleton from '@/components/DatatableSkeleton'

const DatatableSuspenseWrapper = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<DatatableSkeleton />}>{children}</Suspense>
}

export default DatatableSuspenseWrapper
