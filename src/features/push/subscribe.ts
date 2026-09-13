import { urlBase64ToUint8Array } from '../../lib/vapid'
import { pushApi } from './api'

export type SubscribeResult =
  | { ok: true }
  | { ok: false; reason: 'unsupported' | 'denied' }

export async function subscribeToPush(vapidPublicKey: string): Promise<SubscribeResult> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return { ok: false, reason: 'unsupported' }
  }

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') {
    return { ok: false, reason: 'denied' }
  }

  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
  })

  const json = subscription.toJSON()
  if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) {
    return { ok: false, reason: 'unsupported' }
  }
  await pushApi.subscribe({
    endpoint: json.endpoint,
    keys: { p256dh: json.keys.p256dh, auth: json.keys.auth },
  })

  return { ok: true }
}
