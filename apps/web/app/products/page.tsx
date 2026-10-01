import type { Metadata } from 'next';
import { CatalogList, catalogListMetadata } from '@/components/catalog/views';

export const metadata: Metadata = await catalogListMetadata('zh-CN');

export default function Page() {
  return <CatalogList locale="zh-CN" />;
}
