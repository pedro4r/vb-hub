import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'

import { NotificationTable } from './notification-table'

export function NotificationSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-zinc-50">Notificações</Button>
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader>
          <SheetDescription asChild>
            <NotificationTable />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
