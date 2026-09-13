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
          title="耳環系列"
          description="輕盈閃耀的耳環，為整體造型畫龍點睛"
        />
      </main>
      <Footer />
    </div>
  );
}
