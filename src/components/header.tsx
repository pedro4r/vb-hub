import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'

import { AccountMenu } from './account-menu'
import { HubMenu } from './hub-menu'
import { ThemeToggle } from './theme/theme-toggle'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-1 px-4">
        <HubMenu />
        <Separator orientation="vertical" className="h-6" />

        <Button variant="ghost" className="">
          <Link to="/" className="flex select-none items-center gap-2">
            <Home className="h-5 w-5" />
            Início
          </Link>
        </Button>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
