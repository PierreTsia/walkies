'use client'

import { useMemo } from 'react'
import useGetRegistrationRequests from '@/hooks/useGetRegistrationRequests'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { RegistrationRequest, RegistrationRequestStatus } from '@/types'
import { createColumns } from '@/app/admin/registration-requests/columns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useUpdateRegistrationRequestStatus from '@/hooks/useUpdateRegistrationRequestStatus'
import { useUser } from '@/providers/UserProvider'
import { createBrowserClient } from '@/utils/supabase'
import { DateTime } from 'luxon'
import { toast } from '@/hooks/use-toast'

const RegistrationRequestsDatatable = async () => {
  const { data, refetch } = useGetRegistrationRequests()
  const user = useUser()
  const supabase = createBrowserClient()
  const updateRequestStatus = async (
    id: string,
    status: RegistrationRequestStatus,
    refetch: Refetch,
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
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'success',
      variant: 'success',
    })
    void refetch()
  }

  type Refetch = typeof refetch

  const handleStatusUpdate = (
    id: string,
    status: RegistrationRequestStatus,
  ) => {
    void updateRequestStatus(id, status, refetch)
  }
  const columns: ColumnDef<RegistrationRequest>[] =
    createColumns(handleStatusUpdate)
  const memoizedColumns = useMemo(() => columns, [columns])
  const memoizedData = useMemo(() => data, [data])

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
  })
  return (
    <div className="rounded-md border ">
      <Table className={'!text-[0.9rem]'}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default RegistrationRequestsDatatable
