export function ResizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number = 1.0, // Adicionado um novo parâmetro para a qualidade da imagem
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      let { width, height } = img

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      ctx?.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Image resizing failed'))
          }
        },
        file.type,
        quality,
      ) // Passando a qualidade para o método toBlob
    }
    img.onerror = reject
  })
}
