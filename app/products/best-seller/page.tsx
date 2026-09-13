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
          title="熱賣商品"
          description="最受歡迎的經典之作，顧客首選推薦，不容錯過"
        />
      </main>
      <Footer />
    </div>
  );
}
