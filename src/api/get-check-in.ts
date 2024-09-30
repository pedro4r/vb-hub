import { api } from '@/lib/axios'

export interface GetCheckInParams {
  checkInId: string
}

export async function getCheckIn(params: GetCheckInParams) {
  const result = await api.get(`/check-in/${params.checkInId}`)

  return result.data.checkInDetails
}
