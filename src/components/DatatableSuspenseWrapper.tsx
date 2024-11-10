'use client'
import { ReactNode, Suspense } from 'react'
const LoadingDatatable = () => {
  return <div>Loading registration requests...</div>
}

const DatatableSuspenseWrapper = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<LoadingDatatable />}>{children}</Suspense>
}

export default DatatableSuspenseWrapper
