import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    original_price?: number;
    image_path?: string;
    rating?: number;
    reviews?: number;
    featured?: boolean;
    product_images?: { image_path: string }[];
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = product.image_path || product.product_images?.[0]?.image_path;
  const displayImageUrl = imageUrl 
    ? `https://bvbsjfhuclqjzconvqml.supabase.co/storage/v1/object/public/mutlu-hediyem/${imageUrl}`
    : "/placeholder.svg";

  const handleWhatsAppOrder = () => {
    const message = `Merhaba! ${product.name} ürünü hakkında bilgi almak istiyorum.`;
    const whatsappUrl = `https://wa.me/905551234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          {product.featured && (
            <Badge className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground">
              Öne Çıkan
            </Badge>
          )}
          <img
            src={displayImageUrl}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {product.rating && product.rating > 0 && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < product.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews || 0})
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-primary">
              ₺{product.price}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-lg text-muted-foreground line-through">
                ₺{product.original_price}
              </span>
            )}
          </div>

          <Button 
            onClick={handleWhatsAppOrder}
            className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <ShoppingCart className="w-4 h-4" />
            WhatsApp ile Sipariş Ver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;