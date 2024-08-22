import { api } from '@/lib/axios'

export interface CreateCheckInParams {
  customerId: string
  details?: string
  weight?: number
  attachmentsIds: string[]
}

export async function createCheckInApi(params: CreateCheckInParams) {
  const accessToken = localStorage.getItem('access_token')
  const result = await api.post(`/check-in`, params, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return result.status
}
