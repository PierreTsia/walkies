'use client'

import { Column, ColumnDef } from '@tanstack/react-table'
import { RegistrationRequest, RegistrationRequestStatus } from '@/types'

import { ReactNode } from 'react'
import useDateFormats from '@/hooks/useDateFormats'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, ShieldAlert, SmilePlus } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

const getHeaderComponent = ({
  column,
}: {
  column: Column<RegistrationRequest>
}) => {
  return <ColumnHeader column={column} />
}

export const createColumns = (
  onStatusUpdate: (id: string, status: RegistrationRequestStatus) => void,
): ColumnDef<RegistrationRequest>[] => [
  {
    accessorKey: 'requested_at',
    header: getHeaderComponent,
    cell: ({ row }) => {
      return <DateCell date={row.original.requested_at} />
    },
  },
  {
    accessorKey: 'status',
    header: getHeaderComponent,
    cell: ({ row }) => {
      const status = row.original.status
      return <StatusBadge status={status} />
    },
  },
  {
    accessorKey: 'email',
    header: getHeaderComponent,
    cell: ({ row }) => {
      return <TruncatedTextCell>{row.original.email}</TruncatedTextCell>
    },
  },
  {
    accessorKey: 'content_text',
    header: getHeaderComponent,
    cell: ({ row }) => {
      return <TruncatedTextCell>{row.original.content_text}</TruncatedTextCell>
    },
  },
  {
    id: 'actions',
    header: () => null,
    cell: ({ row }) => {
      const request = row.original
      return (
        <TrailingActions request={request} onStatusUpdate={onStatusUpdate} />
      )
    },
  },
]

const TrailingActions = ({
  request,
  onStatusUpdate,
}: {
  request: RegistrationRequest
  onStatusUpdate: (id: string, status: RegistrationRequestStatus) => void
}) => {
  const t = useTranslations('Admin.registration-requests.data-table.actions')

  const handleUpdateStatus = (
    status: RegistrationRequestStatus,
    request: RegistrationRequest,
  ) => {
    if (status === request.status) return
    onStatusUpdate(request.id, status)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">{t('open')}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(request.id)}
        >
          {t('copy')}
        </DropdownMenuItem>
        <DropdownMenuItem>{t('view')}</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleUpdateStatus('approved', request)}
        >
          {t('approve')}
          <SmilePlus color="#33b918" className="ml-1 h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleUpdateStatus('refused', request)}
        >
          {t('refuse')} <ShieldAlert color="#f42a2a" className="ml-1 h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const StatusBadge = ({ status }: { status: RegistrationRequestStatus }) => {
  const variant = () => {
    if (status === 'refused') {
      return 'destructive'
    }
    return status === 'pending' ? 'secondary' : 'default'
  }

  return <Badge variant={variant()}>{status}</Badge>
}

const TruncatedTextCell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full min-w-[100px] max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-xs">
      <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
        {children}
      </span>
    </div>
  )
}

const DateCell = ({ date }: { date: string | null }) => {
  const { shortDateFormat } = useDateFormats()
  const formatted = date ? shortDateFormat(date) : '-'
  return <div className="inline-flex min-w-[80px] text-xs">{formatted}</div>
}

const ColumnHeader = ({ column }: { column: Column<RegistrationRequest> }) => {
  const t = useTranslations('Admin.registration-requests.data-table.columns')
  return (
    <div className="min-w-[100px] text-sm text-indigo-900 dark:text-indigo-200">
      {t(column.id)}
    </div>
  )
}
