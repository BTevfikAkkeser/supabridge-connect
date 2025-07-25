import { useCategories } from "@/hooks/useCategories";
import { Card, CardContent } from "@/components/ui/card";

const CategorySection = () => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-secondary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Kategoriler
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                {category.image_path && (
                  <img
                    src={`https://bvbsjfhuclqjzconvqml.supabase.co/storage/v1/object/public/mutlu-hediyem/${category.image_path}`}
                    alt={category.name}
                    className="w-16 h-16 mx-auto mb-4 object-cover rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                )}
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {category.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;