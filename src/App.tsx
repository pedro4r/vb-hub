import './global.css'

import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './routes'

export function App() {
  setDefaultOptions({ locale: ptBR })
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="voaboxhub-theme">
        <Helmet titleTemplate="%s | Hub">
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Helmet>

        <Toaster richColors />

        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
