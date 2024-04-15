import { UploadIcon, X } from 'lucide-react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { ImageContainer } from '@/components/ui/image-container'
import { Input } from '@/components/ui/input'

import { CheckInTableFilters } from './check-in-table-filters'
import { ResizeImage } from './resize-image'

export interface CustomerDataInterface {
  name: string
  hubId: string
}

export function CreateCheckIn() {
  const [customerData, setCustomerData] = useState<CustomerDataInterface>()
  const [images, setImages] = useState<string[]>([])

  function handleData(data: CustomerDataInterface) {
    setCustomerData(data)
  }

  const { isDragActive, getInputProps, fileRejections } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    multiple: true,
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        ResizeImage(file, 1024, 1024, 0.1).then((ResizedImage) => {
          ResizedImage.arrayBuffer().then((buffer) => {
            console.log(`Resized file size: ${buffer.byteLength} bytes`)
          })

          const reader = new FileReader()
          reader.onloadend = () => {
            setImages((prevImages) => [...prevImages, reader.result as string])
          }
          reader.readAsDataURL(ResizedImage)
        })
      })
    },
  })

  fileRejections.forEach((fileRejection) => {
    console.error(
      `File ${fileRejection.file.name} was rejected. ${fileRejection.errors[0].message}`,
    )
  })

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages) // supondo que você tenha um estado chamado 'images' e um setter chamado 'setImages'
  }

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
            >
              <UploadIcon className="h-4 w-4" />
              <div className="flex flex-col gap-1 text-center">
                <span className="font-medium">Carregar fotos</span>
              </div>
            </label>
            <input type="file" id="files" multiple {...getInputProps()} />
            <div className="flex flex-wrap content-end items-start gap-2">
              {images &&
                images.map((image, index) => (
                  <div key={index} className="relative">
                    <Button
                      variant={'ghost'}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 p-2 text-xs text-stone-50"
                      onClick={(event) => {
                        event.preventDefault()
                        removeImage(index) // Chama a função removeImage com o índice da imagem
                      }}
                    >
                      x
                    </Button>
                    <ImageContainer imageSrc={image} alt={`Preview ${index}`} />
                  </div>
                ))}
            </div>

            <Button type="submit" className="w-full">
              Criar Check-In
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
