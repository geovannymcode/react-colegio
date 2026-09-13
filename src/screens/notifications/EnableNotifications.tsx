import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { isInstalled } from '../../features/push/isInstalled'
import { detectPlatform } from '../../features/push/detectPlatform'
import { subscribeToPush } from '../../features/push/subscribe'

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY

export function EnableNotifications() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const needsInstallFirst = detectPlatform() === 'ios' && !isInstalled()

  async function handleEnable() {
    setError(null)
    const result = await subscribeToPush(VAPID_PUBLIC_KEY)
    if (!result.ok && result.reason === 'denied') {
      setError('No concediste el permiso. Puedes activarlo luego desde los ajustes del sitio.')
      return
    }
    navigate('/app')
  }

  return (
    <div className="screen flex min-h-screen flex-col bg-navy-900 px-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-800">
          <Bell size={28} className="text-lime-500" />
        </div>
        <h1 className="text-h1">Activa tus recordatorios</h1>
        <p className="text-body text-content-secondary">
          PROYÉCTATE te avisa cuando una tarea está por vencer, si tu racha corre riesgo de
          romperse y al cierre de cada semana.
        </p>

        {needsInstallFirst && (
          <p className="rounded-md border border-navy-700 bg-navy-800 p-4 text-caption text-content-secondary">
            En iPhone, las notificaciones solo funcionan con la app ya instalada. Vuelve al paso
            anterior e instálala primero.
          </p>
        )}

        {error && <p className="text-caption text-state-danger">{error}</p>}
      </div>

      <div className="flex flex-col gap-3 pb-8">
        {needsInstallFirst ? (
          <Button onClick={() => navigate('/instalar')}>Volver a instalar</Button>
        ) : (
          <Button onClick={handleEnable}>Permitir notificaciones</Button>
        )}
        <Button variant="ghost" onClick={() => navigate('/app')}>
          Más tarde
        </Button>
      </div>
    </div>
  )
}
