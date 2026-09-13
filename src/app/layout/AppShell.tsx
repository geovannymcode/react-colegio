import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  return (
    <div className="screen min-h-screen bg-navy-900 pb-24">
      <Outlet />
      <BottomNav />
    </div>
  )
}
