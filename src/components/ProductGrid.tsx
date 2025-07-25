import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  featured?: boolean;
  title?: string;
}

const ProductGrid = ({ featured = false, title }: ProductGridProps) => {
  const { data: products, isLoading } = useProducts(featured);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-96 bg-muted animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Henüz ürün bulunmuyor.</p>
      </div>
    );
  }

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;