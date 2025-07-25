import { useEffect, useState } from "react";

const SUPABASE_URL = "https://bvbsjfhuclqjzconvqml.supabase.co/storage/v1/object/public/mutlu-hediyem/";

interface AIImage {
  product: string;
  image_path: string;
}

const AIGallery = () => {
  const [images, setImages] = useState<AIImage[]>([]);

  useEffect(() => {
    fetch("/ai_images.json")
      .then((res) => res.json())
      .then(setImages);
  }, []);

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">AI ile Oluşturulan Ürün Görselleri</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.image_path} className="border rounded-lg p-4 flex flex-col items-center">
            <img
              src={SUPABASE_URL + img.image_path}
              alt={img.product}
              className="w-48 h-48 object-cover mb-2 rounded"
            />
            <div className="text-center text-sm text-muted-foreground">{img.product}</div>
            <div className="text-xs break-all text-gray-400 mt-1">{img.image_path}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIGallery; 