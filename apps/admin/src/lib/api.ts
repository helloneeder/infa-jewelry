import axios, { AxiosError } from 'axios'
import type { ZodIssue } from 'zod'

/**
 * Server's success envelope: `{ ok: true, data: T }`.
 * Error: `{ ok: false, error: { code, message, details? } }` (HTTP 4xx/5xx).
 */
export interface ApiSuccess<T> {
  ok: true
  data: T
}

export interface ApiFailure {
  ok: false
  error: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
}

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure

export const api = axios.create({
  baseURL: '/api',
  // Session lives in an httpOnly cookie (infa_admin_token); sent automatically.
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError<ApiFailure>) => {
    if (err.response?.status === 401) {
      if (window.location.pathname !== '/login') {
        const next = encodeURIComponent(window.location.pathname + window.location.search)
        window.location.replace(`/login?next=${next}`)
      }
    }
    return Promise.reject(err)
  },
)

/** Unwrap `{ ok, data }`, throwing a typed ApiError on failure. */
export async function callApi<T>(
  promise: Promise<{ data: ApiEnvelope<T> }>,
): Promise<T> {
  const res = await promise
  const body = res.data as ApiEnvelope<T>
  if (!body.ok) {
    throw new ApiError(body.error.code, body.error.message, body.error.details)
  }
  return body.data
}

export class ApiError extends Error {
  readonly code: string
  readonly details?: Record<string, unknown>

  constructor(code: string, message: string, details?: Record<string, unknown>) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.details = details
  }
}

/** Helper to flatten zod field errors from a VALIDATION_ERROR response. */
export function fieldIssues(details: unknown): ZodIssue[] {
  if (Array.isArray(details)) return details as ZodIssue[]
  return []
}
