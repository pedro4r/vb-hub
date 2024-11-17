import { api } from '@/lib/axios'

interface FilterCheckInParams {
  hubId?: number
  customerName?: string
  status?: number
}

export async function filterCheckInsApi(params: FilterCheckInParams) {
  const result = await api.post(`/filter-check-ins?page=1`, { ...params })
  return result.data
}
