import { api } from '@/lib/axios'

interface UploadAttachmentsResponse {
  attachmentId: string
}

export async function UploadAttachments(
  file: File,
): Promise<UploadAttachmentsResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/attachments', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })

  const attachment = response.data

  return attachment
}
