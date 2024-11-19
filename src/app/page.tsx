import Header from '@/components/Header'

import MemberContent from '@/components/MemberContent'
import DatatableSuspenseWrapper from '@/components/DatatableSuspenseWrapper'

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center pt-2 ">
      <div className="flex  flex-1 flex-col  px-3">
        <Header />
        <main className="flex w-full max-w-[1200px] flex-1  flex-col gap-6 lg:mx-auto">
          <DatatableSuspenseWrapper>
            <MemberContent />
          </DatatableSuspenseWrapper>
        </main>
      </div>
    </div>
  )
}
