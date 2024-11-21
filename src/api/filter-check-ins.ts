import { api } from '@/lib/axios'

interface FilterCheckInParams {
  hubId?: number
  customerName?: string
  status?: number
  page?: number
}

export async function filterCheckInsApi(params: FilterCheckInParams) {
  const { page, ...restParams } = params

  try {
    const result = await api.post(`/filter-check-ins?page=${page ?? 1}`, {
      ...restParams,
    })
    return result.data.checkInsPreview
  } catch (error) {
    console.error('Error fetching check-ins:', error)
    return { checkIns: [] }
  }
}
