import { ref, onMounted, onUnmounted } from 'vue'
import { createNotificationStream } from '~/services/utility.service'
import type { AppNotification } from '~/lib/models/util'

const RECONNECT_DELAY_MS = 3_000
const MAX_RECONNECT_DELAY_MS = 30_000

export function useNotifications() {
  const notifications = ref<AppNotification[]>([])
  const unread = ref(0)

  let es: EventSource | null = null
  let reconnectTimeout: ReturnType<typeof setTimeout> | null = null
  let reconnectDelay = RECONNECT_DELAY_MS

  function connect() {
    if (!import.meta.client) return

    const config = useRuntimeConfig()
    const token = useCookie<string | null>('access_token').value
    if (!token) return

    const rawBase = (config.public.apiBase as string) || 'http://localhost:5000'
    const baseURL = /^https?:\/\//i.test(rawBase) ? rawBase : `http://${rawBase}`

    es = createNotificationStream(baseURL, token)

    es.addEventListener('init', (e: MessageEvent) => {
      const data = JSON.parse(e.data)
      unread.value = data.unread_count ?? 0
      reconnectDelay = RECONNECT_DELAY_MS // reset backoff on successful connection
    })

    es.addEventListener('notification', (e: MessageEvent) => {
      const notification: AppNotification = JSON.parse(e.data)
      notifications.value.unshift(notification)
      if (!notification.read) unread.value++
    })

    es.onerror = () => {
      es?.close()
      es = null
      // Exponential backoff reconnect
      reconnectTimeout = setTimeout(() => {
        reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY_MS)
        connect()
      }, reconnectDelay)
    }
  }

  function disconnect() {
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout)
      reconnectTimeout = null
    }
    es?.close()
    es = null
  }

  function markAllRead() {
    notifications.value.forEach(n => (n.read = true))
    unread.value = 0
  }

  onMounted(connect)
  onUnmounted(disconnect)

  return { notifications, unread, markAllRead }
}
