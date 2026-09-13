import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/home/HeroBanner';
import ProductSection from '@/components/home/ProductSection';
import BrandStory from '@/components/home/BrandStory';
import MaterialSection from '@/components/home/MaterialSection';
import { getBestSellers, getNewProducts } from '@/lib/products';

export default function Home() {
  const bestSellers = getBestSellers();
  const newProducts = getNewProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 lg:pt-24">
        <HeroBanner />
        
        <ProductSection
          title="熱賣商品"
          subtitle="最受歡迎的經典之作，顧客首選推薦"
          products={bestSellers}
          viewAllHref="/products/best-seller"
        />
        
        <BrandStory />
        
        <ProductSection
          title="新品上市"
          subtitle="最新設計系列，為你的日常增添新意"
          products={newProducts}
          viewAllHref="/products/new"
        />
        
        <MaterialSection />
      </main>
      
      <Footer />
    </div>
  );
}
