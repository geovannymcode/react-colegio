import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { PrivacyNote } from '../../components/PrivacyNote'
import { useLogin, useRegister } from '../../features/auth/useAuth'
import { ApiError } from '../../lib/api-client'

const registerSchema = z.object({
  nickname: z.string().min(2, 'Escribe al menos 2 caracteres.'),
  email: z.email('Escribe un correo válido.'),
  password: z.string().min(6, 'La contraseña debe tener 6 caracteres o más.'),
  acceptPrivacy: z.literal(true, { message: 'Acepta la política de privacidad para continuar.' }),
})

const loginSchema = z.object({
  email: z.email('Escribe un correo válido.'),
  password: z.string().min(1, 'Escribe tu contraseña.'),
})

type RegisterForm = z.infer<typeof registerSchema>
type LoginForm = z.infer<typeof loginSchema>

interface AuthScreenProps {
  mode: 'register' | 'login'
}

export function AuthScreen({ mode }: AuthScreenProps) {
  const navigate = useNavigate()
  const register = useRegister()
  const login = useLogin()
  const isRegister = mode === 'register'

  const form = useForm<RegisterForm | LoginForm>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  })

  async function onSubmit(values: RegisterForm | LoginForm) {
    try {
      if (isRegister) {
        const { nickname, email, password } = values as RegisterForm
        await register.mutateAsync({ nickname, email, password })
        navigate('/activar-notificaciones')
      } else {
        const { email, password } = values as LoginForm
        await login.mutateAsync({ email, password })
        navigate('/app')
      }
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Revisa tu conexión e intenta de nuevo.'
      form.setError('root', { message })
    }
  }

  const isPending = register.isPending || login.isPending
  const errors = form.formState.errors as Record<string, { message?: string } | undefined>

  return (
    <div className="screen min-h-screen bg-navy-900 px-6">
      <h1 className="text-h1">{isRegister ? 'Crea tu cuenta' : 'Inicia sesión'}</h1>
      <p className="mt-2 text-body text-content-secondary">
        {isRegister
          ? 'Solo pedimos lo mínimo: un apodo y tu correo institucional.'
          : 'Entra con el correo y la contraseña que usaste al crear tu cuenta.'}
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
        {isRegister && (
          <Input
            label="Nombre o apodo"
            error={errors.nickname?.message}
            {...form.register('nickname' as keyof (RegisterForm | LoginForm))}
          />
        )}
        <Input
          label="Correo institucional"
          type="email"
          error={errors.email?.message}
          {...form.register('email')}
        />
        <Input
          label="Contraseña"
          type="password"
          error={errors.password?.message}
          {...form.register('password')}
        />

        {isRegister && (
          <label className="flex items-start gap-2 text-caption text-content-secondary">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded-sm border-navy-700 bg-navy-800"
              {...form.register('acceptPrivacy' as keyof RegisterForm)}
            />
            Acepto la política de privacidad de PROYÉCTATE.
          </label>
        )}

        {isRegister && <PrivacyNote />}

        {errors.acceptPrivacy?.message && (
          <p className="text-caption text-state-danger">{errors.acceptPrivacy.message}</p>
        )}
        {errors.root?.message && <p className="text-caption text-state-danger">{errors.root.message}</p>}

        <Button type="submit" disabled={isPending}>
          {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
        </Button>
      </form>

      <p className="mt-4 text-center text-caption text-content-muted">
        {isRegister ? (
          <>
            ¿Ya tienes cuenta?{' '}
            <button className="text-lime-500" onClick={() => navigate('/iniciar-sesion')}>
              Inicia sesión
            </button>
          </>
        ) : (
          <>
            ¿Aún no tienes cuenta?{' '}
            <button className="text-lime-500" onClick={() => navigate('/crear-cuenta')}>
              Créala
            </button>
          </>
        )}
      </p>
    </div>
  )
}
