import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <CategorySection />
      <ProductGrid featured={true} title="Öne Çıkan Ürünler" />
      <ProductGrid title="Tüm Ürünler" />
      <Footer />
    </div>
  );
};

export default Index;
