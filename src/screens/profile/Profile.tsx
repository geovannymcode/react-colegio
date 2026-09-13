import { Bell } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { AchievementRow } from '../../components/ui/AchievementRow'
import { StatCard } from '../../components/ui/StatCard'
import { PrivacyNote } from '../../components/PrivacyNote'
import { useMe } from '../../features/auth/useAuth'
import { useStats } from '../../features/stats/useStats'
import { useAchievements } from '../../features/achievements/useAchievements'
import { useAuthStore } from '../../features/auth/authStore'
import { isInstalled } from '../../features/push/isInstalled'

export function Profile() {
  const { data: user } = useMe()
  const { data: stats } = useStats()
  const { data: achievements } = useAchievements()
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="flex flex-col gap-6 px-5 pt-4 pb-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime-500 text-h1 text-navy-900">
          {user?.nickname?.[0]?.toUpperCase() ?? '?'}
        </div>
        <p className="text-h2">{user?.nickname}</p>
        <p className="text-caption text-content-muted">{user?.email}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard value={stats?.completedGoals ?? 0} label="Metas completadas" />
        <StatCard value={stats?.tasksCompleted ?? 0} label="Tareas hechas" />
        <StatCard value={user?.streakCount ?? 0} label="Racha" />
      </div>

      <section>
        <h2 className="text-h2">Logros</h2>
        <Card className="mt-3 divide-y divide-navy-700">
          {(achievements ?? []).map((achievement) => (
            <AchievementRow
              key={achievement.code}
              title={achievement.title}
              description={achievement.description}
              unlocked={achievement.unlocked}
            />
          ))}
        </Card>
      </section>

      <section>
        <h2 className="text-h2">Notificaciones</h2>
        <Card className="mt-3 flex items-center gap-3">
          <Bell size={20} className="text-lime-500" />
          <span className="flex-1 text-body">Recordatorios push</span>
          <span className="text-caption text-content-secondary">
            {isInstalled() ? 'Activado' : 'Instala la app para activarlas'}
          </span>
        </Card>
      </section>

      <PrivacyNote />

      <Button variant="ghost" onClick={logout}>
        Cerrar sesión
      </Button>
    </div>
  )
}
