import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductList from '@/components/product/ProductList';
import { getProducts } from '@/lib/products';

export default function EarringsPage() {
  const products = getProducts('earrings');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ProductList
          products={products}
          title="耳环系列"
          description="轻盈闪耀的耳环，为整体造型画龙点睛"
        />
      </main>
      <Footer />
    </div>
  );
}
