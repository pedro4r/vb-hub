import React from 'react'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function CheckInCarrousel() {
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
          <CarouselItem className="flex justify-center">
            <img
              src="public/7e7444bd-34ec-4900-a334-23cdcc1e1914.JPG"
              alt="Slide 1"
              className="h-full w-full object-contain"
            />
          </CarouselItem>
          <CarouselItem className="w-px-100 h-px-100 flex justify-center">
            <img
              src="public/310a5071-7889-4746-85ff-98f011ff831f.JPG"
              alt="Slide 2"
              className="h-full w-full object-contain"
            />
          </CarouselItem>
          <CarouselItem className="w-px-100 h-px-100 flex justify-center">
            <img
              src="public/0cd72168-8922-47a7-bd07-54691723009e.JPG"
              alt="Slide 3"
              className="h-full w-full object-contain"
            />
          </CarouselItem>
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
