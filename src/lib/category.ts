import type { Category, Priority } from '../types/domain'

export const CATEGORY_LABEL: Record<Category, string> = {
  ACADEMICA: 'Académica',
  PERSONAL: 'Personal',
  HABITO: 'Hábito',
  PROFESIONAL: 'Profesional',
}

export const CATEGORY_COLOR: Record<Category, string> = {
  ACADEMICA: 'var(--color-accent-blue)',
  PERSONAL: 'var(--color-accent-purple)',
  HABITO: 'var(--color-lime-500)',
  PROFESIONAL: 'var(--color-accent-blue)',
}

export const PRIORITY_LABEL: Record<Priority, string> = {
  ALTA: 'Prioridad alta',
  MEDIA: 'Prioridad media',
  BAJA: 'Prioridad baja',
}

export const PRIORITY_COLOR: Record<Priority, string> = {
  ALTA: 'var(--color-state-danger)',
  MEDIA: 'var(--color-state-warning)',
  BAJA: 'var(--color-state-success)',
}
