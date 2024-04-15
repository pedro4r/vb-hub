import { api } from '@/lib/axios'

interface UploadAttachmentsResponse {
  attachmentId: string
}

export async function UploadAttachments(
  file: File,
): Promise<UploadAttachmentsResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const accessToken =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMDA5ODQyZS0wODAwLTQ1OTAtOGJlOS02Mzc4Yzk0MWU4ZGIiLCJpYXQiOjE3MTMxMTk3MjB9.Xe2sXZWdFoibsqrmfXkxmt_PNDQ0EQI4mDpN-9JNu-2uSV8oAPOzDDS8-DUMedVFbVjHOkfvxLjWvnFzF0WVi42jZe7k5mOzCMwW6JV0X-3KTA2NghvH80mon9eytvQHM2qyYQYGgq5ZxxDXK75Z8NytcukNqWmk3myjpNJrT3XGimzHG7cy1DsMbHUdm-bfLIB_I4pwJ58H2t5yjje2jSx7VhNXTtvRg56eSvSFE6XSLT7o4uY6zBY9VjcY5ZNTmaKk6paC8OUnXH0vMIiCr8y61GD2N3Rue_YdSfTtO7_pP9xCgLH47WfrfwRcQbdkDkwMXgZMwGEfRjjyf7jDVg'

  const response = await api.post('/attachments', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const attachment = response.data

  return attachment
}
