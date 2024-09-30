import { api } from '@/lib/axios'

export interface FetchCustomersByNameParams {
  name: string
  page: number
}

export async function fetchCustomersByName(params: FetchCustomersByNameParams) {
  const result = await api.get(
    `/customers/${encodeURIComponent(params.name)}?page=${params.page}`,
    {
      withCredentials: true,
    },
  )
  return result.data.customersPreview
}
