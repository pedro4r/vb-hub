import { format } from 'date-fns'
import { useState } from 'react'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { ImageContainer } from '@/components/ui/image-container'
import { capitalize } from '@/utils/capitalize-string'

import { CheckInDetailsAttachmentsPagination } from './check-in-details-attachments-pagination'
import { CheckInDetailsProps } from './check-in-table-row'

export function CheckInDetails({
  checkInId,
  hubId,
  customerFirstName,
  customerLastName,
  attachments,
  status,
  weight,
  details,
  createdAt,
}: CheckInDetailsProps) {
  const windowWidth = window.innerWidth

  const perPage =
    windowWidth <= 640 && details.length > 0 ? 6 : details.length > 0 ? 8 : 10

  const [currentPage, setCurrentPage] = useState(1)
  const [attachmentsOnDisplay, setAttachmentsOnDisplay] = useState<string[]>(
    attachments.slice(0, perPage),
  )
  const date = format(new Date(createdAt), 'dd/MM/yyyy - hh:mm a')

  function handlePaginate(pageIndex: number) {
    setCurrentPage(pageIndex)
    const start = (pageIndex - 1) * perPage
    const end = pageIndex * perPage
    setAttachmentsOnDisplay(attachments.slice(start, end))
  }
  return (
    <DialogContent className="flex h-[85vh] w-[90vw] appearance-none flex-col items-center">
      <DialogHeader className="flex flex-col items-center justify-center">
        <DialogDescription className="text-xs">
          {checkInId.toUpperCase()}
        </DialogDescription>
        <span>{`#${hubId} ${customerFirstName} ${customerLastName}`}</span>
      </DialogHeader>

      <div className="flex flex-row items-center justify-center gap-6">
        <div className="flex flex-row items-center justify-center gap-5">
          <span className="text-muted-foreground">Status:</span>
          <span>{capitalize(status)}</span>
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          <span className="text-muted-foreground">Weight:</span>
          <span className="">
            {weight ? `${Math.round(weight / 453.59237)} lb` : '--'}
          </span>
        </div>
      </div>
      {details.length > 0 ? (
        <div className="flex w-full flex-row gap-5 rounded-sm bg-zinc-900 p-2">
          <span className="text-muted-foreground">Obs.</span>
          <span className="w-full self-center">{details}</span>
        </div>
      ) : (
        ''
      )}

      <div className="object-fit flex flex-wrap content-end items-start justify-center gap-2">
        {attachmentsOnDisplay.map((attachment, i) => (
          <a
            key={i}
            className="appearance-none"
            href={attachment}
            target="_blank"
            rel="noreferrer"
          >
            <ImageContainer imageSrc={attachment} alt={`${i}`} />
          </a>
        ))}
      </div>

      <CheckInDetailsAttachmentsPagination
        pageIndex={currentPage}
        totalCount={attachments.length}
        perPage={perPage}
        onPageChange={handlePaginate}
      />
      <div className="mt-auto flex flex-col items-center justify-center">
        <span className="text-xs text-muted-foreground">
          Data de Recebimento
        </span>
        <span className="text-sm">{date}</span>
      </div>
    </DialogContent>
  )
}
