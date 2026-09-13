import { QueryClient } from '@tanstack/react-query'
import { experimental_createQueryPersister } from '@tanstack/query-persist-client-core'
import { get, set, del } from 'idb-keyval'

const idbStorage = {
  getItem: async (key: string) => (await get(key)) ?? null,
  setItem: async (key: string, value: string) => set(key, value),
  removeItem: async (key: string) => del(key),
}

const { persisterFn } = experimental_createQueryPersister({
  storage: idbStorage,
  maxAge: 1000 * 60 * 60 * 24 * 7,
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      persister: persisterFn,
    },
  },
})
