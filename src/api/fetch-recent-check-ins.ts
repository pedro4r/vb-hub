import { api } from '@/lib/axios'

export interface FetchRecentCheckInsParams {
  page: number
}

export async function fetchRecentCheckIns(params: FetchRecentCheckInsParams) {
  const result = await api.get(`/check-ins?page=${params.page}`)
  return result.data.checkInsPreview
}
