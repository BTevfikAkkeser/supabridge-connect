import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { data: settings } = useSiteSettings();

  if (!settings) return null;

  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary">
              {settings.site_title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {settings.site_description}
            </p>
            <Button 
              onClick={handleWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              WhatsApp ile İletişim
            </Button>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim Bilgileri</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>{settings.phone_number}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href={`mailto:${settings.email_address}`} className="hover:text-primary transition-colors">
                  {settings.email_address}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{settings.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Sosyal Medya</h4>
            <div className="flex gap-4">
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 {settings.site_title}. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;