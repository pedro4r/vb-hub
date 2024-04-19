import { zodResolver } from '@hookform/resolvers/zod'
import { UploadIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createCheckInApi } from '@/api/create-check-in'
import { UploadAttachments } from '@/api/upload-attachments'
import { Button } from '@/components/ui/button'
import { ImageContainer } from '@/components/ui/image-container'
import { Textarea } from '@/components/ui/textarea'

import { CheckInTableFilters } from './check-in-table-filters'
import { ResizeImage } from './resize-image'

const createCheckInSchema = z.object({
  customerId: z.string().uuid(),
  description: z.string().optional(),
})

type CreateCheckFormData = z.infer<typeof createCheckInSchema>

export interface CustomerPreviewDataInterface {
  customerId: string
  firstName: string
  lastName: string
  hubId: number
}

export function CreateCheckIn() {
  const [customerData, setCustomerData] =
    useState<CustomerPreviewDataInterface | null>(null)
  const [images, setImages] = useState<string[]>([])

  function handleSetCustomerData(data: CustomerPreviewDataInterface) {
    setCustomerData(data)
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const { isDragActive, getInputProps, fileRejections } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    multiple: true,
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        ResizeImage(file, 1024, 1024, 0.5).then((ResizedImage) => {
          ResizedImage.arrayBuffer()
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

  const { register, handleSubmit, setValue } = useForm<CreateCheckFormData>({
    resolver: zodResolver(createCheckInSchema),
  })

  useEffect(() => {
    setValue('customerId', customerData?.customerId || '')
  }, [customerData, setValue])

  async function handleCreateCheckIn(data: CreateCheckFormData) {
    if (!images.length) {
      console.log('No images to upload')
      return
    }

    const attachments = []
    for (const imageUrl of images) {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })
      const attachment = await UploadAttachments(file)
      attachments.push(attachment)
    }

    const result = createCheckInApi({
      customerId: data.customerId,
      details: data.description,
      attachmentsIds: attachments.map((attachment) => attachment.attachmentId),
    })

    console.log('Check-in created:', result)
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
              <span>{`${customerData.firstName} ${customerData.lastName}`}</span>
              <Button
                onClick={() => {
                  setCustomerData(null)
                }}
                variant="ghost"
                className="bg-red-600"
              >
                <X />
              </Button>
            </div>
          ) : (
            <CheckInTableFilters onData={handleSetCustomerData} />
          )}

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleCreateCheckIn)}
          >
            <input
              value={customerData?.customerId || ''}
              className="hidden"
              {...register('customerId')}
            />
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
                        removeImage(index)
                      }}
                    >
                      x
                    </Button>
                    <ImageContainer imageSrc={image} alt={`Preview ${index}`} />
                  </div>
                ))}
            </div>

            <Textarea placeholder="Observações" {...register('description')} />

            <Button className="w-full" type="submit">
              Criar Check-In
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
