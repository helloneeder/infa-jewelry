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
          title="全部产品"
          description="探索 INFA 全系列轻珠宝，找到屬于你的独特风格"
        />
      </main>
      <Footer />
    </div>
  );
}
