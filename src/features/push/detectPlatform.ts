export type Platform = 'ios' | 'android' | 'desktop'

export function detectPlatform(): Platform {
  const ua = navigator.userAgent
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios'
  if (/Android/.test(ua)) return 'android'
  return 'desktop'
}

/** iOS solo permite "Agregar a inicio" desde Safari (05-PWA-PUSH.md §5). */
export function isSafari(): boolean {
  const ua = navigator.userAgent
  return /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(ua)
}
