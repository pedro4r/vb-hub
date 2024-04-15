import './global.css'

import { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { UploadAttachments } from './api/upload-attachments'
import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './routes'

export function App() {
  useEffect(() => {
    fetch('/test.jpg')
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], 'test.jpg', { type: 'image/jpeg' })
        UploadAttachments(file)
          .then((att) => console.log('Upload successful', att))
          .catch((error) => console.error('Error uploading file:', error))
      })
  }, [])
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="voaboxhub-theme">
        <Helmet titleTemplate="%s | Hub" />

        <Toaster richColors />

        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
