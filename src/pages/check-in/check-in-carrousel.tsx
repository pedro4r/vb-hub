import React from 'react'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface CheckInCarrouselProps {
  imagesUrl: string[]
}

export function CheckInCarrousel({ imagesUrl }: CheckInCarrouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <div>
      <Carousel setApi={setApi}>
        <CarouselPrevious />
        <CarouselContent className="max-h-96 max-w-96">
          {imagesUrl.map((imageUrl, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <img
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>

      <div className="mt-4 flex justify-center text-zinc-500">
        <span>
          {current}/{count}
        </span>
      </div>
    </div>
  )
}
