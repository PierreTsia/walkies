import DatatableSuspenseWrapper from '@/components/DatatableSuspenseWrapper'
import RegistrationRequestsDatatable from '@/components/RegistrationRequestsDatatable'

export default async function Page() {
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
          <DatatableSuspenseWrapper>
            <RegistrationRequestsDatatable />
          </DatatableSuspenseWrapper>
        </main>
      </div>
    </div>
  )
}
