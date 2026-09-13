import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { RequireAuth } from './RequireAuth'
import { RootRedirect } from './RootRedirect'
import { Welcome } from '../screens/welcome/Welcome'
import { InstallApp } from '../screens/install/InstallApp'
import { AuthScreen } from '../screens/auth/AuthScreen'
import { EnableNotifications } from '../screens/notifications/EnableNotifications'
import { Home } from '../screens/home/Home'
import { GoalsList } from '../screens/goals/GoalsList'
import { GoalDetail } from '../screens/goals/GoalDetail'
import { NewGoal } from '../screens/goals/NewGoal'
import { Progress } from '../screens/progress/Progress'
import { Evaluation } from '../screens/evaluation/Evaluation'
import { Profile } from '../screens/profile/Profile'

export const router = createBrowserRouter([
  { path: '/', element: <RootRedirect /> },
  { path: '/bienvenida', element: <Welcome /> },
  { path: '/instalar', element: <InstallApp /> },
  { path: '/crear-cuenta', element: <AuthScreen mode="register" /> },
  { path: '/iniciar-sesion', element: <AuthScreen mode="login" /> },
  { path: '/activar-notificaciones', element: <EnableNotifications /> },
  {
    path: '/app',
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'metas', element: <GoalsList /> },
      { path: 'metas/nueva', element: <NewGoal /> },
      { path: 'metas/:id', element: <GoalDetail /> },
      { path: 'metas/:id/evaluar', element: <Evaluation /> },
      { path: 'avances', element: <Progress /> },
      { path: 'perfil', element: <Profile /> },
    ],
  },
])
