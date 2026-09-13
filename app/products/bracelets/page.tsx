import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductList from '@/components/product/ProductList';
import { getProducts } from '@/lib/products';

export default function BraceletsPage() {
  const products = getProducts('bracelets');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ProductList
          products={products}
          title="手鏈系列"
          description="細緻的手鏈設計，點綴手腕的優雅風采"
        />
      </main>
      <Footer />
    </div>
  );
}
