interface ImageContainerProps {
  imageSrc: string
  alt: string
}

export function ImageContainer({ imageSrc, alt }: ImageContainerProps) {
  return (
    <div className="flexitems-center rounded border p-1">
      <img
        className="max-w-[5rem] rounded"
        src={imageSrc}
        alt={`Preview ${alt}`}
      />
    </div>
  )
}
