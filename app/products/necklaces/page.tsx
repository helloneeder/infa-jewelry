import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductList from '@/components/product/ProductList';
import { getProducts } from '@/lib/products';

export default function NecklacesPage() {
  const products = getProducts('necklaces');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ProductList
          products={products}
          title="項鏈系列"
          description="輕盈優雅的項鏈，為頸間增添迷人光彩"
        />
      </main>
      <Footer />
    </div>
  );
}
