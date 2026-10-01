import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { callApi, api } from './api'
import type {
  PaginatedData,
  MediaAsset,
} from '@infa/shared'

/**
 * Media/upload client. Mirrors the final server contract (4c861cb):
 *   POST /api/upload       field `file`  → MediaAsset
 *   POST /api/upload/many  field `files` → { items: MediaAsset[], count }
 *   GET/PUT/DELETE /api/media
 * Types now come from @infa/shared (MediaAssetSchema).
 */

export type { MediaAsset }

export interface MediaListParams {
  page?: number
  pageSize?: number
}

/** Front-end mirror of the server hard limits; used for pre-flight validation. */
export const UPLOAD_LIMITS = {
  maxBytes: 5 * 1024 * 1024,
  allowMime: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const,
} as const

export const mediaKeys = {
  all: ['media'] as const,
  list: (params: MediaListParams) => ['media', 'list', params] as const,
}

export function useMediaList(params: MediaListParams = {}) {
  return useQuery({
    queryKey: mediaKeys.list(params),
    queryFn: () =>
      callApi<PaginatedData<MediaAsset>>(api.get('/media', { params })),
  })
}

/** POST /api/upload — multipart, field name `file`. */
export function useUploadImage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (file: File): Promise<MediaAsset> => {
      const form = new FormData()
      form.append('file', file)
      // Let the browser set the multipart boundary; do NOT force JSON content-type.
      return callApi<MediaAsset>(
        api.post('/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } }),
      )
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: mediaKeys.all }),
  })
}

/** POST /api/upload/many — multipart, field name `files`; atomic on the server. */
export function useUploadManyImages() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (files: File[]): Promise<MediaAsset[]> => {
      const form = new FormData()
      files.forEach((f) => form.append('files', f))
      const data = await callApi<{ items: MediaAsset[]; count: number }>(
        api.post('/upload/many', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
      )
      return data.items
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: mediaKeys.all }),
  })
}

/** PUT /api/media/:id — only `alt` is mutable. */
export function useUpdateMediaAlt(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (alt: string) =>
      callApi<MediaAsset>(api.put(`/media/${id}`, { alt })),
    onSuccess: () => qc.invalidateQueries({ queryKey: mediaKeys.all }),
  })
}

/** DELETE /api/media/:id — blocked server-side while a product references it. */
export function useDeleteMedia() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      callApi<{ success: true }>(api.delete(`/media/${id}`)),
    onSuccess: () => qc.invalidateQueries({ queryKey: mediaKeys.all }),
  })
}

/** Pre-flight check matching the server rules; returns an error string or null. */
export function validateUploadFile(file: File): string | null {
  if (!(UPLOAD_LIMITS.allowMime as readonly string[]).includes(file.type)) {
    return '仅支持 JPG / PNG / GIF / WebP 格式'
  }
  if (file.size > UPLOAD_LIMITS.maxBytes) {
    return '单张图片不能超过 5MB'
  }
  if (file.size === 0) {
    return '文件为空'
  }
  return null
}
