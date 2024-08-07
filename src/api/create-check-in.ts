import { api } from '@/lib/axios'

export interface CreateCheckInParams {
  customerId: string
  details?: string
  weight?: number
  attachmentsIds: string[]
}

export async function createCheckInApi(params: CreateCheckInParams) {
  const accessToken =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMDA5ODQyZS0wODAwLTQ1OTAtOGJlOS02Mzc4Yzk0MWU4ZGIiLCJpYXQiOjE3MjEzMzE3MDF9.GwRk7YM87Sh6vRPlRN5mrme2kzzXh6idps6MFw_IYqaXaXpH1HhbEHLSXkVN6dYnUmdPTgpcjlEoy-goRgwmhg-I2pjKrfgxLWKj3I342nEeFVUHRs_r8qI11P1k8_otnU5ZVN05QdG-83mrJc1efGxOtkLr6ra4sc2ndQvWB3sBBoHP4ckhV0BtG4ds3hQZxHyGPCrQ6RzgTIXINQgE5Lh6C4RbgbdOfOmvF_S7TtyHrVr7M5QHtssc0rmezzvvJ4DwvEA8hQ5sEazuFjKR7kc0bElDP5-TDJ-puLN5gHLAtdcy0pyhGpKUUiMa9F5vRFpmtWVgKWzKNr7mhmBa9g'
  const result = await api.post(`/check-in`, params, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return result.status
}
