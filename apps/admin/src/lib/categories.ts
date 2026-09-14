import { useQuery } from '@tanstack/react-query'

import { callApi, api } from './api'
import type { Category } from '@infa/shared'

export const categoryKeys = {
  all: ['categories'] as const,
}

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => callApi<Category[]>(api.get('/categories')),
    staleTime: 60 * 1000,
  })
}
