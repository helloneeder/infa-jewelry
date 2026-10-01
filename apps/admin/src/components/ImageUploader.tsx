import { useCallback, useRef, useState } from 'react'
import { ImagePlus, Loader2, Star, Trash2, X } from 'lucide-react'

import { useUploadManyImages, validateUploadFile } from '@/lib/media'
import type { ProductImage } from '@infa/shared'

interface ImageUploaderProps {
  value: ProductImage[]
  onChange: (images: ProductImage[]) => void
  /** Max number of images allowed on this product. */
  max?: number
}

/**
 * Product image manager. Uploads immediately to /api/upload/many and stores the
 * returned MediaAsset URLs as ProductImage entries. The physical files live in
 * the media library; removing an item here only unlinks it from the product
 * (files are deleted from the Media page after reference checks).
 */
export function ImageUploader({ value, onChange, max = 12 }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const upload = useUploadManyImages()

  const remaining = max - value.length

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return
      setLocalError(null)

      const files = Array.from(fileList).slice(0, Math.max(0, remaining))
      if (fileList.length > remaining) {
        setLocalError(`最多 ${max} 张，已忽略超出的 ${fileList.length - remaining} 张`)
      }

      const invalid = files.map(validateUploadFile).find(Boolean)
      if (invalid) {
        setLocalError(invalid)
        return
      }

      try {
        const assets = await upload.mutateAsync(files)
        const added: ProductImage[] = assets.map((a) => ({
          url: a.url,
          alt: a.originalName,
          isMain: false,
        }))
        // First-ever image becomes the cover automatically.
        const next = [...value, ...added]
        if (!next.some((i) => i.isMain) && next.length > 0) {
          next[0] = { ...next[0], isMain: true }
        }
        onChange(next)
      } catch {
        setLocalError('上传失败，请稍后重试')
      }
    },
    [max, remaining, upload, value, onChange],
  )

  const setMain = (idx: number) => {
    onChange(value.map((img, i) => ({ ...img, isMain: i === idx })))
  }

  const remove = (idx: number) => {
    const removed = value[idx]
    const next = value.filter((_, i) => i !== idx)
    // Promote a new cover if we removed the current one.
    if (removed.isMain && next.length > 0) {
      next[0] = { ...next[0], isMain: true }
    }
    onChange(next)
  }

  const updateAlt = (idx: number, alt: string) => {
    onChange(value.map((img, i) => (i === idx ? { ...img, alt } : img)))
  }

  const busy = upload.isPending

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        multiple
        className="hidden"
        onChange={(e) => {
          void handleFiles(e.target.files)
          e.target.value = '' // allow re-selecting the same file
        }}
      />

      {value.length > 0 && (
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {value.map((img, idx) => (
            <li
              key={`${img.url}-${idx}`}
              className="group relative overflow-hidden rounded-lg border border-border bg-white"
            >
              <div className="aspect-square">
                <img
                  src={img.url}
                  alt={img.alt ?? ''}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-1 p-2">
                <input
                  value={img.alt ?? ''}
                  onChange={(e) => updateAlt(idx, e.target.value)}
                  placeholder="图片说明（可选）"
                  className="w-full rounded border border-border px-2 py-1 text-xs outline-none focus:border-brand"
                />
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setMain(idx)}
                    disabled={img.isMain}
                    className="flex items-center gap-1 text-xs text-ink-muted transition hover:text-brand disabled:text-brand"
                    title="设为主图"
                  >
                    <Star size={13} fill={img.isMain ? 'currentColor' : 'none'} />
                    {img.isMain ? '主图' : '设主图'}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    className="text-ink-muted transition hover:text-danger"
                    title="移除"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy || remaining <= 0}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          void handleFiles(e.dataTransfer.files)
        }}
        className={`mt-3 flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-8 text-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
          dragging
            ? 'border-brand bg-brand/5 text-brand'
            : 'border-border text-ink-muted hover:border-brand hover:text-brand'
        }`}
      >
        {busy ? (
          <>
            <Loader2 size={20} className="animate-spin" /> 上传中…
          </>
        ) : (
          <>
            <ImagePlus size={20} />
            <span>点击或拖拽图片到此处上传</span>
            <span className="text-xs text-ink-muted">
              JPG / PNG / GIF / WebP，单张 ≤ 5MB，最多 {max} 张（还可加 {remaining} 张）
            </span>
          </>
        )}
      </button>

      {localError && (
        <p className="mt-2 flex items-center gap-1 text-xs text-danger">
          <X size={12} /> {localError}
        </p>
      )}
      {upload.isError && !localError && (
        <p className="mt-2 text-xs text-danger">上传失败，请重试</p>
      )}
    </div>
  )
}
