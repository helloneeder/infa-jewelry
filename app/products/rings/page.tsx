import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductList from '@/components/product/ProductList';
import { getProducts } from '@/lib/products';

export default function RingsPage() {
  const products = getProducts('rings');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ProductList
          products={products}
          title="戒指系列"
          description="指尖上的璀璨光芒，诉说独特的个人风格"
        />
      </main>
      <Footer />
    </div>
  );
}
