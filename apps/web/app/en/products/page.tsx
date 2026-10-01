import type { Metadata } from 'next';
import { CatalogList, catalogListMetadata } from '@/components/catalog/views';

export const metadata: Metadata = await catalogListMetadata('en');

export default function Page() {
  return <CatalogList locale="en" />;
}
