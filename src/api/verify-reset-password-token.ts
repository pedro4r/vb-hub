import { isAxiosError } from 'axios'

import { api } from '@/lib/axios'

export async function verifyResetPasswordToken(token: string) {
  try {
    const response = await api.post('/verify-reset-password-token', { token })
    return response.data.email
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const { data } = error.response
      throw new Error(data.message)
    } else {
      throw error
    }
  }
}
