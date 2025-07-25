import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProducts = (featured?: boolean) => {
  return useQuery({
    queryKey: ["products", featured],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select(`
          *,
          product_images (
            image_path
          )
        `)
        .eq("in_stock", true)
        .order("created_at", { ascending: false });

      if (featured) {
        query = query.eq("featured", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });
};