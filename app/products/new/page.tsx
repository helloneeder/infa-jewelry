import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductList from '@/components/product/ProductList';
import { getNewProducts } from '@/lib/products';

export default function NewProductsPage() {
  const products = getNewProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ProductList
          products={products}
          title="新品上市"
          description="LUMI 最新設計系列，為你的日常增添新意與光芒"
        />
      </main>
      <Footer />
    </div>
  );
}
