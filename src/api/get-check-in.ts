import { api } from '@/lib/axios'

export interface GetCheckInParams {
  checkInId: string
}

export async function getCheckIn(params: GetCheckInParams) {
  const accessToken = localStorage.getItem('access_token')
  const result = await api.get(`/check-in/${params.checkInId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return result.data.checkInDetails
}
