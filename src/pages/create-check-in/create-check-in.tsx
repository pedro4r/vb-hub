import { UploadIcon, X } from 'lucide-react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { CheckInTableFilters } from './check-in-table-filters'

export interface CustomerDataInterface {
  name: string
  hubId: string
}

export function CreateCheckIn() {
  const [customerData, setCustomerData] = useState<CustomerDataInterface>()

  function handleData(data: CustomerDataInterface) {
    setCustomerData(data)
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
    },
    multiple: true,
    maxSize: 524_288_000,
  })
  return (
    <div className="mt-20 flex h-full w-full items-center justify-center">
      <Helmet title="Criar Check-in" />

      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold tracking-tight">Criar Check-In</h1>

        <div className="w-[400px] space-y-2.5 ">
          {customerData ? (
            <div className="flex items-center justify-between rounded-md bg-neutral-900 pl-4">
              <span>{`#${customerData.hubId}`}</span>
              <span>{customerData.name}</span>
              <Button
                onClick={() => {
                  setCustomerData(undefined)
                }}
                variant="ghost"
                className="bg-red-600"
              >
                <X />
              </Button>
            </div>
          ) : (
            <CheckInTableFilters onData={handleData} />
          )}

          <form className="flex flex-col gap-4">
            <Input type="text" className="hidden" />
            <label
              htmlFor="files"
              className="flex h-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed bg-zinc-50 p-4 text-sm text-zinc-600 hover:bg-zinc-100 data-[drag-active=true]:border-primary data-[drag-active=true]:bg-primary dark:bg-zinc-900 dark:text-zinc-400"
              data-drag-active={isDragActive}
              {...getRootProps()}
            >
              <UploadIcon className="h-4 w-4" />
              <div className="flex flex-col gap-1 text-center">
                <span className="font-medium">Carregar fotos</span>
              </div>
            </label>

            <input type="file" id="files" multiple {...getInputProps()} />

            <Button type="submit" className="w-full">
              Criar Check-In
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
