import type { Metadata } from 'next';
import {
  CatalogDetail,
  catalogDetailMetadata,
  allActiveProductIds,
} from '@/components/catalog/views';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return catalogDetailMetadata('zh-TW', Number(id));
}

export async function generateStaticParams() {
  const ids = await allActiveProductIds();
  return ids.map((id) => ({ id: String(id) }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CatalogDetail locale="zh-TW" productId={Number(id)} />;
}
