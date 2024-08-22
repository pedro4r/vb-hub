import { api } from '@/lib/axios'

export interface GetCustomerByHubIdParams {
  hubId: number
}

export async function getCustomerByHubId(params: GetCustomerByHubIdParams) {
  const accessToken = localStorage.getItem('access_token')
  const result = await api.get(`/customer/${params.hubId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return result.data.customerPreview
}
