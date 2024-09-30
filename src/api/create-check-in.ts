import { api } from '@/lib/axios'

export interface CreateCheckInParams {
  customerId: string
  details?: string
  weight?: number
  attachmentsIds: string[]
}

export async function createCheckInApi(params: CreateCheckInParams) {
  const result = await api.post(`/check-in`, params, {
    withCredentials: true,
  })
  return result.status
}
