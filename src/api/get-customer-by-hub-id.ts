import { api } from '@/lib/axios'

export interface GetCustomerByHubIdParams {
  hubId: number
}

export async function getCustomerByHubId(params: GetCustomerByHubIdParams) {
  const result = await api.get(`/customer/${params.hubId}`)

  return result.data.customerPreview
}
