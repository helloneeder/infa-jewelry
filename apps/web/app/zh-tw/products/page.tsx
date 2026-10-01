import type { Metadata } from 'next';
import { CatalogList, catalogListMetadata } from '@/components/catalog/views';

export const metadata: Metadata = await catalogListMetadata('zh-TW');

export default function Page() {
  return <CatalogList locale="zh-TW" />;
}
