import { api } from '@/lib/axios'

export interface FetchCustomersByNameParams {
  name: string
  page: number
}

export async function fetchCustomersByName(params: FetchCustomersByNameParams) {
  const accessToken =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMDA5ODQyZS0wODAwLTQ1OTAtOGJlOS02Mzc4Yzk0MWU4ZGIiLCJpYXQiOjE3MjEzMzA5NDZ9.TcTINYxw8Af0ISTqJkyplwOdtcBrGaWt4E8u9eKtMyV4YC8Y6es3Z6LnknZttXvuUY1lw9lV_HmNrcvfV6X8BgzrIfcXwI08OjeEztJfQNP8HKZPBlgu7QIu-AYdR5hBMYJJnHwQcu3_ttlBzQw6qKtPBKR9IPXDoB6F1v_kMbSU_FRQwBnO53kXGpr0Tv5lugPaBupjroPLHtikE_JdCNfDeYqf_3DxWVz74yB7uXzzCK4KfSE0GUTnjMWRLFkz3BD9eLJHeS57CaM2D4Kpz5V3Wr4BTQ6tL8qXG4wnPVb-D6DYEdtUhzcR1kn8Z_6lAy7feXoG0bTxFbQcQNKm7A'
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
