import { api } from '@/lib/axios'

export interface FetchRecentCheckInsParams {
  page: number
}

export async function fetchRecentCheckIns(params: FetchRecentCheckInsParams) {
  const accessToken = localStorage.getItem('access_token')
  const result = await api.get(`/check-ins?page=${params.page}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return result.data.checkInsPreview
}
