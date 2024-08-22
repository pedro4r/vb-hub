import { api } from '@/lib/axios'

export interface FetchCustomersByNameParams {
  name: string
  page: number
}

export async function fetchCustomersByName(params: FetchCustomersByNameParams) {
  const accessToken = localStorage.getItem('access_token')
  const result = await api.get(
    `/customers/${encodeURIComponent(params.name)}?page=${params.page}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  return result.data.customersPreview
}
