import { Home, Target, TrendingUp, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const ITEMS = [
  { to: '/app', label: 'Inicio', icon: Home, end: true },
  { to: '/app/metas', label: 'Metas', icon: Target },
  { to: '/app/avances', label: 'Avances', icon: TrendingUp },
  { to: '/app/perfil', label: 'Perfil', icon: User },
]

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 flex border-t border-navy-700 bg-navy-800 pb-6 pt-2">
      {ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 py-2 text-caption ${
              isActive ? 'text-lime-500' : 'text-content-muted'
            }`
          }
        >
          <Icon size={22} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
