const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BUCKET = 'mutlu-hediyem';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function downloadImage(url, filepath) {
  const response = await axios({ url, responseType: 'stream', method: 'GET' });
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function main() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*');
  if (error) throw error;

  const results = [];

  for (const product of products) {
    if (!product.image_path) {
      const prompt = product.name + (product.description ? (', ' + product.description) : '');
      // 1. AI ile görsel oluştur
      const dalleRes = await axios.post(
        'https://api.openai.com/v1/images/generations',
        { prompt, n: 1, size: '512x512' },
        { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
      );
      const imageUrl = dalleRes.data.data[0].url;
      // 2. Görseli indir
      const filename = `ai_${product.id}_${Date.now()}.png`;
      const filepath = path.join(__dirname, filename);
      await downloadImage(imageUrl, filepath);
      // 3. Supabase Storage'a yükle
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filename, fs.createReadStream(filepath), { contentType: 'image/png', upsert: true });
      if (uploadError) throw uploadError;
      // 4. Ürünün image_path alanını güncelle
      const { error: updateError } = await supabase
        .from('products')
        .update({ image_path: filename })
        .eq('id', product.id);
      if (updateError) throw updateError;
      // 5. Sonucu kaydet
      results.push({ product: product.name, image_path: filename });
      // 6. Dosyayı sil
      fs.unlinkSync(filepath);
    }
  }

  console.log('AI ile oluşturulan görseller ve dosya yolları:');
  results.forEach(r => console.log(`${r.product}: ${r.image_path}`));
  fs.writeFileSync('ai_images.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('Ayrıca ai_images.json dosyasına da kaydedildi.');
}

main().catch(console.error); 