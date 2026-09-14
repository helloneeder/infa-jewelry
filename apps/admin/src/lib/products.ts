import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { callApi, api } from './api'
import type {
  PaginatedData,
  Product,
  ProductCreateInput,
  ProductUpdateInput,
} from '@infa/shared'

export const productKeys = {
  all: ['products'] as const,
  list: (params: unknown) => ['products', 'list', params] as const,
  detail: (id: number) => ['products', 'detail', id] as const,
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => callApi<Product>(api.get(`/products/${id}`)),
    enabled: Number.isFinite(id) && id > 0,
  })
}

export function useCreateProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: ProductCreateInput) =>
      callApi<Product>(api.post('/products', input)),
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all }),
  })
}

export function useUpdateProduct(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: ProductUpdateInput) =>
      callApi<Product>(api.put(`/products/${id}`, input)),
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all }),
  })
}

export type { PaginatedData }
