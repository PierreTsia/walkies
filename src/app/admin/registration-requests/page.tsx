import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import { RegistrationRequestsDataTable } from '@/app/admin/registration-requests/registration-requests-data-table'
import { createColumns } from '@/app/admin/registration-requests/columns'
import { RegistrationRequest } from '@/types'

export default async function Page() {
  const fetchRequests = async (): Promise<RegistrationRequest[]> => {
    'use server'
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { data, error } = await supabase
      .from('registration_requests')
      .select('*')
    if (error) {
      return []
    }

    return data
  }

  const data = await fetchRequests()
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  return (
    <div className="flex w-full items-center justify-center px-0 py-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-lg shadow-lg">
        <header className="px-6 py-4">
          <h1 className="text-2xl font-semibold">Registration Requests</h1>
          <p className="mt-1 text-sm">
            Manage and review registration requests from community members
          </p>
        </header>
        <main className="p-6">
          <RegistrationRequestsDataTable initialData={data} />
        </main>
      </div>
    </div>
  )
}
