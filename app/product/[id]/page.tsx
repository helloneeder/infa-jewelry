import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductClient from './ProductClient';
import { getProductById, mockProducts } from '@/lib/products';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-cream-white border-b border-champagne-gold/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="text-sm text-medium-gray">
              <Link href="/" className="hover:text-champagne-gold">首页</Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-champagne-gold">产品系列</Link>
              <span className="mx-2">/</span>
              <span className="text-dark-gray">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <ProductClient product={product} />
      </main>
      <Footer />
    </div>
  );
}
