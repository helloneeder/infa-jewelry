import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductList from '@/components/product/ProductList';
import { getProducts } from '@/lib/products';

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ProductList
          products={products}
          title="全部產品"
          description="探索 LUMI 全系列輕珠寶，找到屬於你的獨特風格"
        />
      </main>
      <Footer />
    </div>
  );
}
