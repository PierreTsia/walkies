import Header from '@/components/Header'

import MemberContent from '@/components/MemberContent'
import getMe from '@/app/actions/getMe'
import getMyDogs from '@/app/actions/getMyDogs'
import { Suspense } from 'react'

export default async function Index() {
  const user = await getMe()
  const dogs = await getMyDogs(user?.id ?? '')

  return (
    <div className="flex w-full flex-1 flex-col items-center pt-2 ">
      <div className="flex  flex-1 flex-col  px-3">
        <Header />
        <main className="flex w-full max-w-[1200px] flex-1  flex-col gap-6 lg:mx-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <MemberContent user={user} dogs={dogs} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
