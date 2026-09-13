import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductList from '@/components/product/ProductList';
import { getBestSellers } from '@/lib/products';

export default function BestSellersPage() {
  const products = getBestSellers();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ProductList
          products={products}
          title="热卖商品"
          description="最受欢迎的经典之作，顾客首选推荐，不容错过"
        />
      </main>
      <Footer />
    </div>
  );
}
