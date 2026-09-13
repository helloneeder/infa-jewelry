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
          title="热卖商品"
          subtitle="最受欢迎的经典之作，顾客首选推荐"
          products={bestSellers}
          viewAllHref="/products/best-seller"
        />
        
        <BrandStory />
        
        <ProductSection
          title="新品上市"
          subtitle="最新设计系列，为你的日常增添新意"
          products={newProducts}
          viewAllHref="/products/new"
        />
        
        <MaterialSection />
      </main>
      
      <Footer />
    </div>
  );
}
