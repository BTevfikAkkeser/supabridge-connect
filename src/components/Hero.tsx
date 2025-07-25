import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Hero = () => {
  const { data: settings } = useSiteSettings();

  if (!settings) return null;

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/hero-pattern.svg')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {settings.hero_title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {settings.hero_subtitle}
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {settings.hero_button_text}
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 backdrop-blur-sm border border-white/10">
              <img
                src={`https://bvbsjfhuclqjzconvqml.supabase.co/storage/v1/object/public/mutlu-hediyem/${settings.hero_image}`}
                alt={settings.site_title}
                className="w-full h-full object-cover rounded-xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;