import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Chip } from '../../components/ui/Chip'
import { detectPlatform, type Platform } from '../../features/push/detectPlatform'
import { useInstallPrompt } from '../../features/push/useInstallPrompt'

const STEPS: Record<Exclude<Platform, 'desktop'>, string[]> = {
  ios: [
    'Toca el botón Compartir en la barra inferior',
    'Desliza y selecciona "Agregar a inicio"',
    'Confirma y listo',
  ],
  android: [
    'Abre el menú (los tres puntos arriba a la derecha)',
    'Selecciona "Instalar app" o "Agregar a pantalla de inicio"',
    'Confirma y listo',
  ],
}

export function InstallApp() {
  const navigate = useNavigate()
  const [platform, setPlatform] = useState<Exclude<Platform, 'desktop'>>(() => {
    const detected = detectPlatform()
    return detected === 'android' ? 'android' : 'ios'
  })
  const { canInstall, promptInstall } = useInstallPrompt()

  async function handleInstallClick() {
    const accepted = await promptInstall()
    if (accepted) navigate('/crear-cuenta')
  }

  return (
    <div className="screen flex min-h-screen flex-col bg-navy-900 px-6">
      <div>
        <h1 className="text-h1">Instala PROYÉCTATE</h1>
        <p className="mt-2 text-body text-content-secondary">
          No está en la App Store ni en Play Store: se instala directo desde el navegador en 3
          pasos.
        </p>
      </div>

      <div className="mt-6 flex gap-2">
        <Chip active={platform === 'ios'} onClick={() => setPlatform('ios')}>
          iPhone
        </Chip>
        <Chip active={platform === 'android'} onClick={() => setPlatform('android')}>
          Android
        </Chip>
      </div>

      <ol className="mt-6 flex flex-col gap-4">
        {STEPS[platform].map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-500 text-caption font-bold text-navy-900">
              {index + 1}
            </span>
            <span className="text-body text-content-primary">{step}</span>
          </li>
        ))}
      </ol>

      {platform === 'ios' && (
        <p className="mt-6 text-caption text-content-muted">
          Esto solo funciona en Safari. Si abriste este enlace desde Instagram, WhatsApp o Chrome,
          ábrelo en Safari primero.
        </p>
      )}

      <div className="mt-auto flex flex-col gap-3 pb-8">
        {platform === 'android' && canInstall && (
          <Button onClick={handleInstallClick}>Instalar</Button>
        )}
        <Button variant="ghost" onClick={() => navigate('/crear-cuenta')}>
          Ya la instalé, continuar
        </Button>
      </div>
    </div>
  )
}
