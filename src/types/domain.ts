export type GoalStatus = 'ACTIVA' | 'COMPLETADA' | 'ARCHIVADA';

export type TaskStatus = 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA';

export type Priority = 'ALTA' | 'MEDIA' | 'BAJA';

export type Category = 'ACADEMICA' | 'PERSONAL' | 'HABITO' | 'PROFESIONAL';

export interface User {
  id: string;
  nickname: string;
  email: string;
  streakCount: number;
  createdAt: string;
}

/** El backend no expone prioridad por tarea, solo por meta. */
export interface Task {
  id: string;
  goalId: string;
  title: string;
  status: TaskStatus;
  dueDate: string | null;
  completedAt: string | null;
  position: number;
}

export interface Evaluation {
  id: string;
  goalId: string;
  rating: number;
  didWell: string;
  difficulties: string;
  improvements: string;
  createdAt: string;
}

/** Forma de GET /goals (lista) — sin tareas, solo agregados. */
export interface GoalSummary {
  id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: GoalStatus;
  startDate: string;
  dueDate: string | null;
  completedAt?: string | null;
  /** Fracción 0..1, ya calculada por el servidor. */
  progress: number;
  tasksTotal: number;
  tasksCompleted: number;
  hasEvaluation: boolean;
}

/** Forma de GET /goals/:id — incluye tareas y evaluación embebida. */
export interface Goal extends GoalSummary {
  tasks: Task[];
  evaluation: Evaluation | null;
}

export type AchievementCode =
  | 'PRIMERA_META'
  | 'PRIMERA_EVALUACION'
  | 'RACHA_7'
  | 'RACHA_30'
  | 'DIEZ_TAREAS'
  | 'CINCUENTA_TAREAS';

/** El servidor manda título y descripción ya redactados. */
export interface Achievement {
  code: AchievementCode;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt: string | null;
}

export interface WeekdayTaskStat {
  date: string;
  weekday: string;
  count: number;
}

export interface CategoryProgressStat {
  category: Category;
  /** Fracción 0..1. */
  progress: number;
}

export interface Stats {
  tasksCompleted: number;
  activeGoals: number;
  completedGoals: number;
  streakCount: number;
  overallProgress: number;
  tasksByWeekday: WeekdayTaskStat[];
  progressByCategory: CategoryProgressStat[];
}
