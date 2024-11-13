import { api } from '@/lib/axios'
interface AxiosError extends Error {
  response?: {
    status: number
  }
}

export interface GetCustomerByHubIdParams {
  hubId: number
}

export async function getCustomerByHubId(params: GetCustomerByHubIdParams) {
  try {
    const result = await api.get(`/customer/${params.hubId}`)
    return result.data.customerPreview
  } catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response && axiosError.response.status === 404) {
      throw new Error('Customer not found')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
