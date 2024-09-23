import { isAxiosError } from 'axios'

import { api } from '@/lib/axios'

export interface ResetPasswordParams {
  token: string
  newPassword: string
}

export async function resetPassword(params: ResetPasswordParams) {
  try {
    await api.post('/reset-password', params)
    return { success: true }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const { data } = error.response
      throw new Error(data.message)
    } else {
      throw error
    }
  }
}
