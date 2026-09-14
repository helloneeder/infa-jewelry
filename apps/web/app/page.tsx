import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/home/HeroBanner';
import BrandStory from '@/components/home/BrandStory';
import MaterialSection from '@/components/home/MaterialSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 lg:pt-24">
        <HeroBanner />
        
        <BrandStory />
        
        <MaterialSection />
      </main>
      
      <Footer />
    </div>
  );
}
