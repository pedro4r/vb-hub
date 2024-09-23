import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { resetPassword, ResetPasswordParams } from '@/api/reset-password'
import { verifyResetPasswordToken } from '@/api/verify-reset-password-token'

const loginSchema = z
  .object({
    password: z
      .string()
      .min(
        8,
        'A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais (ex: @, #, $)',
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais (ex: @, #, $)',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  })

type LoginFormData = z.infer<typeof loginSchema>

export function ResetPassword() {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const formData: ResetPasswordParams = {
      token,
      newPassword: data.password,
    }

    try {
      await resetPassword(formData)
      navigate('/login/company')
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(String(error))
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const urlToken = urlParams.get('token')
      if (!urlToken) {
        return
      }
      setToken(urlToken)
      try {
        const emailResponse = await verifyResetPasswordToken(urlToken)
        setEmail(emailResponse)
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message)
        } else {
          setErrorMessage(String(error))
        }
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Helmet title="Company Login" />

      {email !== '' ? (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="mb-6 text-3xl font-bold tracking-tight">
            Crie sua nova senha
          </h1>
          <form
            className="w-full max-w-sm rounded p-8 shadow-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="password"
                type="password"
                placeholder="Nova Senha"
                {...register('password')}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <input
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="confirmPassword"
                type="password"
                placeholder="Confirme a senha"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center justify-between space-y-4">
              <button
                className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                Alterar senha
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <p className="text-center text-2xl font-bold">{errorMessage}</p>
        </div>
      )}
    </>
  )
}
