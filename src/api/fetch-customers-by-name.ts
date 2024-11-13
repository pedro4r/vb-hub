import { api } from '@/lib/axios'
interface AxiosError extends Error {
  response?: {
    status: number
  }
}

export interface FetchCustomersByNameParams {
  name: string
  page: number
}

export async function fetchCustomersByName(params: FetchCustomersByNameParams) {
  try {
    const result = await api.get(
      `/customers/${encodeURIComponent(params.name)}?page=${params.page}`,
    )
    return result.data.customersPreview
  } catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response && axiosError.response.status === 404) {
      throw new Error('Customer not found')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
