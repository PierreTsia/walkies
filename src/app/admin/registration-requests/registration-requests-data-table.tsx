'use client'

import { useState } from 'react'
import { DataTable } from '@/app/admin/registration-requests/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { RegistrationRequest, RegistrationRequestStatus } from '@/types'
import { createBrowserClient } from '@/utils/supabase'
import { toast } from '@/hooks/use-toast'
import { createColumns } from '@/app/admin/registration-requests/columns'
import { DateTime } from 'luxon'
import { useUser } from '@/providers/UserProvider'
import { useTranslations } from 'next-intl'

interface DataTableWithActionsProps {
  initialData: RegistrationRequest[]
}

export function RegistrationRequestsDataTable({
  initialData,
}: DataTableWithActionsProps) {
  const [data, setData] = useState<RegistrationRequest[]>(initialData)
  const supabase = createBrowserClient()
  const user = useUser()
  const t = useTranslations('Admin.registration-requests.data-table.actions')

  const updateRequestStatus = async (
    id: string,
    status: RegistrationRequestStatus,
  ) => {
    const { error } = await supabase
      .from('registration_requests')
      .update({
        status,
        reviewed_at: DateTime.now().toISO(),
        reviewed_by: user?.id,
      })
      .eq('id', id)

    if (error) {
      toast({
        title: t('error', { error: error.message }),
        description: error.message,
        variant: 'destructive',
      })
      return
    }

    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, status } : item)),
    )

    toast({
      title: t('success'),
      variant: 'success',
    })
  }

  const columns: ColumnDef<RegistrationRequest>[] =
    createColumns(updateRequestStatus)

  return <DataTable columns={columns} data={data} />
}
