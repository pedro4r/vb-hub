import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { sendResetPasswordEmail } from '@/api/send-reset-password-email'

const loginSchema = z.object({
  email: z.string().email(),
})

type LoginFormData = z.infer<typeof loginSchema>

export function SendResetPasswordEmail() {
  const [emailSent, setEmailSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await sendResetPasswordEmail(data.email)
      setEmailSent(true)
      setErrorMessage(null) // Clear any previous error message
    } catch (error) {
      console.error('Error', error)
      setErrorMessage('Ocorreu um erro ao enviar o e-mail. Tente novamente.')
    }
  }

  return (
    <>
      <Helmet title="Company Login" />

      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-xl font-bold tracking-tight">
          Digite seu e-mail para recuperar a senha
        </h1>
        {emailSent && (
          <p className="text-green-500">E-mail enviado com sucesso!</p>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <form
          className="w-full max-w-sm rounded p-8 shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email é obrigatório' })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center justify-between space-y-4">
            <button
              className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Enviar e-mail de recuperação
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
