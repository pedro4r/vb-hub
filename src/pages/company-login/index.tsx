import { Helmet } from 'react-helmet-async'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { AuthParams, companyAuthenticate } from '@/api/company-login'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type LoginFormData = z.infer<typeof loginSchema>

export function CompanyLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const params: AuthParams = { email: data.email, password: data.password }
    try {
      await companyAuthenticate(params)
      navigate('/')
    } catch (error) {
      console.error('Erro', error)
    }
  }

  return (
    <>
      <Helmet title="Company Login" />

      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">
          Company Login
        </h1>
        <form
          className="w-full max-w-sm rounded p-8 shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
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
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Senha"
              {...register('password', { required: 'Senha é obrigatória' })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Acessar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
