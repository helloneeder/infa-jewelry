import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { callApi, api, type ApiSuccess, type ApiFailure } from './api'
import type { Admin, LoginRequest } from '@infa/shared'

export const authKeys = {
  me: ['auth', 'me'] as const,
}

export function useMe() {
  return useQuery<Admin | null>({
    queryKey: authKeys.me,
    queryFn: async () => {
      try {
        const data = await callApi<{ admin: Admin }>(api.get('/auth/me'))
        return data.admin
      } catch (err) {
        if ((err as { response?: { status?: number } }).response?.status === 401) return null
        throw err
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
}

export function useLogin() {
  return useMutation<{ admin: Admin }, unknown, LoginRequest>({
    mutationFn: (payload) => callApi<{ admin: Admin }>(api.post('/auth/login', payload)),
  })
}

export function useLogout() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => callApi<{ success: true }>(api.post('/auth/logout')),
    onSuccess: () => qc.setQueryData(authKeys.me, null),
  })
}

export type { Admin, ApiSuccess, ApiFailure }
