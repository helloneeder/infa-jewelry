'use client';

import { useState } from 'react';
import type { ProductImage } from '@infa/shared';

interface ProductGalleryProps {
  images: ProductImage[];
  name: string;
  noImageLabel: string;
}

export default function ProductGallery({ images, name, noImageLabel }: ProductGalleryProps) {
  const ordered = [...images].sort((a, b) => Number(b.isMain) - Number(a.isMain));
  const [active, setActive] = useState(0);

  if (ordered.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-white text-sm text-light-gray">
        {noImageLabel}
      </div>
    );
  }

  const current = ordered[Math.min(active, ordered.length - 1)];

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-lg bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.url}
          alt={current.alt || name}
          className="h-full w-full object-cover"
        />
      </div>

      {ordered.length > 1 && (
        <div className="mt-3 flex gap-2">
          {ordered.map((img, i) => (
            <button
              key={`${img.url}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={`h-16 w-16 overflow-hidden rounded-md border transition ${
                i === active
                  ? 'border-champagne-gold'
                  : 'border-transparent hover:border-champagne-gold/50'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt || ''} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
