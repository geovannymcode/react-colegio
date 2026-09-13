import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { isInstalled } from '../../features/push/isInstalled'

export function Welcome() {
  const navigate = useNavigate()

  function handleCreateAccount() {
    navigate(isInstalled() ? '/crear-cuenta' : '/instalar')
  }

  return (
    <div className="screen flex min-h-screen flex-col justify-between bg-navy-900 px-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-lime-500">
          <svg width="34" height="40" viewBox="0 0 34 40" fill="none">
            <polygon points="17,0 34,40 0,40" fill="#081426" />
          </svg>
        </div>
        <div>
          <h1 className="text-display">PROYÉCTATE</h1>
          <p className="mt-1 text-body text-content-secondary">Planifica. Actúa. Logra.</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-8">
        <p className="text-center text-body text-content-secondary">
          Tu guía digital para alcanzar tus metas y construir tu mejor versión.
        </p>
        <Button onClick={handleCreateAccount}>Crear cuenta</Button>
        <Button variant="ghost" onClick={() => navigate('/iniciar-sesion')}>
          Ya tengo cuenta
        </Button>
      </div>
    </div>
  )
}
