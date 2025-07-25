require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'public', 'ai-local-images');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const products = [
  { id: 1, name: 'Kırmızı Kupa Bardak', description: 'Seramik, 350ml' },
  { id: 2, name: 'Mavi Defter', description: 'Çizgili, 100 sayfa' },
  { id: 3, name: 'Yeşil Kalem', description: 'Jel mürekkep' },
];

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
  const results = [];
  for (const product of products) {
    const prompt = product.name + (product.description ? (', ' + product.description) : '');
    // 1. AI ile görsel oluştur
    const dalleRes = await axios.post(
      'https://api.openai.com/v1/images/generations',
      { prompt, n: 1, size: '512x512' },
      { headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    const imageUrl = dalleRes.data.data[0].url;
    // 2. Görseli indir
    const filename = `ai_${product.id}_${Date.now()}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);
    await downloadImage(imageUrl, filepath);
    // 3. Sonucu kaydet
    results.push({ product: product.name, image_path: `ai-local-images/${filename}` });
  }
  fs.writeFileSync(path.join(__dirname, 'public', 'ai-local-images', 'ai_images.json'), JSON.stringify(results, null, 2), 'utf-8');
  console.log('AI ile oluşturulan görseller ve dosya yolları public/ai-local-images/ klasörüne kaydedildi.');
}

main().catch(console.error); 